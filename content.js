console.log("X.com detected, activated.");

// Configuration object
const CONFIG = {
    indicatorTextActive: '✅',
    indicatorTextInactive: '🛑',
    indicatorText: '✅',
    selectors: {
        timeline: 'main[role="main"]',
        tweet: 'article',
        likeButton: 'button[data-testid="like"]',
        unlikeButton: 'button[data-testid="unlike"]',
        bookmarkButton: 'button[data-testid="bookmark"]',
        removeBookmarkButton: 'button[data-testid="removeBookmark"]'
    }
};

// UI Module
const UIModule = {
    isActive: true,
    widget: null,

    async init() {
        await this.loadState();
        this.addIndicatorWidget();
    },

    async loadState() {
        return new Promise((resolve) => {
            chrome.storage.sync.get(['isActive'], (result) => {
                this.isActive = result.isActive !== undefined ? result.isActive : true;
                resolve();
            });
        });
    },

    async saveState() {
        return new Promise((resolve) => {
            chrome.storage.sync.set({ isActive: this.isActive }, resolve);
        });
    },

    addIndicatorWidget() {
        this.widget = document.createElement('div');
        this.updateWidgetState();
        this.widget.style.cssText = `
            position: fixed;
            bottom: 10px;
            left: 10px;
            color: white;
            padding: 5px;
            border-radius: 50%;
            font-size: 20px;
            z-index: 9999;
            cursor: pointer;
        `;
        this.widget.addEventListener('click', this.toggleActive.bind(this));
        document.body.appendChild(this.widget);
    },

    updateWidgetState() {
        if (this.widget) {
            this.widget.innerHTML = this.isActive ? CONFIG.indicatorTextActive : CONFIG.indicatorTextInactive;
        }
    },

    async toggleActive() {
        this.isActive = !this.isActive;
        await this.saveState();
        this.updateWidgetState();
        console.log(this.isActive ? "Extension activated!" : "Extension deactivated!");
    },

    isExtensionActive() {
        return this.isActive;
    }
};

// Action Module
const ActionModule = {
    toggleBookmark(tweetElement, shouldBookmark) {
        const bookmarkSelector = shouldBookmark ? CONFIG.selectors.bookmarkButton : CONFIG.selectors.removeBookmarkButton;
        const bookmarkButton = tweetElement.querySelector(bookmarkSelector);
        if (bookmarkButton) {
            bookmarkButton.click();
            console.log(shouldBookmark ? "Bookmark action triggered!" : "Remove bookmark action triggered!");
        } else {
            console.log("Bookmark/removeBookmark button not found in this tweet.");
        }
    }
};

// Event Handler Module
const EventHandlerModule = {
    handleLikeButtonClick(event) {
        if (!UIModule.isExtensionActive()) return;

        const button = event.target.closest(`${CONFIG.selectors.likeButton}, ${CONFIG.selectors.unlikeButton}`);
        if (!button) return;

        const isLiking = button.getAttribute('data-testid') === 'like';
        console.log(isLiking ? "Detected like button click!" : "Detected unlike button click!");
        
        const tweetContainer = button.closest(CONFIG.selectors.tweet);
        if (!tweetContainer) {
            console.log("Tweet container not found.");
            return;
        }

        const currentBookmarkButton = tweetContainer.querySelector(`${CONFIG.selectors.bookmarkButton}, ${CONFIG.selectors.removeBookmarkButton}`);
        if (!currentBookmarkButton) {
            console.log("Bookmark/removeBookmark button not found in this tweet.");
            return;
        }

        const isCurrentlyBookmarked = currentBookmarkButton.getAttribute('data-testid') === 'removeBookmark';
        
        if ((isLiking && !isCurrentlyBookmarked) || (!isLiking && isCurrentlyBookmarked)) {
            ActionModule.toggleBookmark(tweetContainer, isLiking);
        } else {
            console.log("No bookmark action needed.");
        }
    },

    addTimelineListener() {
        const timeline = document.querySelector(CONFIG.selectors.timeline);
        if (timeline) {
            timeline.addEventListener('click', this.handleLikeButtonClick);
        }
    }
};

// Main App Module
const App = {
    async init() {
        await UIModule.init();
        EventHandlerModule.addTimelineListener();
        this.observeDOMChanges();
    },

    observeDOMChanges() {
        const observer = new MutationObserver(() => {
            EventHandlerModule.addTimelineListener();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
};

// Initialize the app
App.init();
