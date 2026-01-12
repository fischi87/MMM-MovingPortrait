/* MMM-MovingPortrait
 * Module for displaying animated portrait videos with rotation
 * 
 * By Axel
 * MIT Licensed.
 */

Module.register("MMM-MovingPortrait", {
    defaults: {
        // Array of portrait objects with file and optional name
        portraits: [
            { file: "portrait.mp4", name: "Portrait 1" }
        ],

        // Display settings
        width: "400px",
        height: "600px",
        opacity: 0.85,

        // Frame styles: "hogwarts", "vintage", "modern", "none"
        frameStyle: "hogwarts",

        // Rotation settings
        rotationInterval: 30000,  // Time in ms before switching to next portrait (0 = no rotation)
        fadeTransitionDuration: 2000,  // Duration of crossfade in ms

        // Edge effects
        softEdges: true,  // Smooth edges with box-shadow effect

        // Info display
        showName: false,  // Show portrait name as overlay
        namePosition: "bottom",  // "top" or "bottom"

        // Video settings
        autoplay: true,
        loop: true,
        muted: true,

        // Random settings
        randomOnShow: true,  // Start with random portrait when showing

        // Path to videos folder (relative to module folder)
        videosPath: "videos/",

        // Time-based schedule
        scheduleEnabled: false,  // Enable time-based visibility control
        schedules: []  // Array of {start: "HH:MM", end: "HH:MM"} objects
    },

    currentIndex: 0,
    rotationTimer: null,
    isVisible: true,
    isRotationPaused: false,
    scheduleTimer: null,
    isScheduleHidden: false,  // Track if module is hidden by schedule

    start: function () {
        Log.info("Starting module: " + this.name);

        // Validate portraits array
        if (!this.config.portraits || this.config.portraits.length === 0) {
            Log.error("MMM-MovingPortrait: No portraits configured!");
            this.config.portraits = [{ file: "portrait.mp4", name: "Default" }];
        }

        // Random start index if enabled
        if (this.config.randomOnShow && this.config.portraits.length > 1) {
            this.currentIndex = Math.floor(Math.random() * this.config.portraits.length);
            Log.info("MMM-MovingPortrait: Starting with random portrait at index " + this.currentIndex);
        } else {
            this.currentIndex = 0;
        }

        // Start rotation if multiple portraits and interval > 0
        if (this.config.portraits.length > 1 && this.config.rotationInterval > 0) {
            this.scheduleRotation();
        }
    },

    getDom: function () {
        const wrapper = document.createElement("div");
        wrapper.className = "mmm-moving-portrait-wrapper";

        // Create container for video with frame
        const container = document.createElement("div");
        container.className = "portrait-container";
        container.classList.add("frame-" + this.config.frameStyle);

        // Apply size and opacity from config
        container.style.width = this.config.width;
        container.style.height = this.config.height;
        container.style.opacity = this.config.opacity;

        // Create two video elements for crossfade
        const video1 = this.createVideoElement(this.currentIndex);
        video1.className = "portrait-video active";

        const video2 = this.createVideoElement(this.currentIndex);
        video2.className = "portrait-video inactive";
        video2.style.opacity = "0";

        container.appendChild(video1);
        container.appendChild(video2);

        // Add soft edges overlay if enabled
        if (this.config.softEdges) {
            const overlay = document.createElement("div");
            overlay.className = "soft-edges-overlay";
            container.appendChild(overlay);
        }

        // Add character name if enabled
        if (this.config.showName) {
            const nameOverlay = document.createElement("div");
            nameOverlay.className = "portrait-name " + this.config.namePosition;
            nameOverlay.innerHTML = this.config.portraits[this.currentIndex].name || "";
            container.appendChild(nameOverlay);
        }

        wrapper.appendChild(container);
        return wrapper;
    },

    createVideoElement: function (index) {
        const portrait = this.config.portraits[index];
        const video = document.createElement("video");

        video.src = this.file(this.config.videosPath + portrait.file);
        video.autoplay = this.config.autoplay;
        video.loop = this.config.loop;
        video.muted = this.config.muted;
        video.playsInline = true;  // Important for mobile

        // Apply styling
        video.style.width = "100%";
        video.style.height = "100%";
        video.style.objectFit = "cover";
        video.style.display = "block";

        return video;
    },

    scheduleRotation: function () {
        const self = this;

        // Don't schedule if paused or rotation disabled
        if (this.isRotationPaused || !this.isVisible) {
            return;
        }

        // Clear existing timer
        if (this.rotationTimer) {
            clearTimeout(this.rotationTimer);
        }

        // Schedule next rotation
        this.rotationTimer = setTimeout(function () {
            self.rotatePortrait();
        }, this.config.rotationInterval);
    },

    rotatePortrait: function () {
        // Don't rotate if paused
        if (this.isRotationPaused) {
            return;
        }

        // Calculate next index
        this.currentIndex = (this.currentIndex + 1) % this.config.portraits.length;
        this.updatePortraitDisplay();

        // Schedule next rotation
        this.scheduleRotation();
    },

    updatePortraitDisplay: function () {
        // Get video elements
        const container = document.querySelector(".portrait-container");
        if (!container) {
            Log.warn("MMM-MovingPortrait: Container not found");
            return;
        }

        const activeVideo = container.querySelector(".portrait-video.active");
        const inactiveVideo = container.querySelector(".portrait-video.inactive");

        if (!activeVideo || !inactiveVideo) {
            Log.warn("MMM-MovingPortrait: Video elements not found");
            return;
        }

        // Update inactive video source
        const portrait = this.config.portraits[this.currentIndex];
        inactiveVideo.src = this.file(this.config.videosPath + portrait.file);

        // Perform crossfade
        const duration = this.config.fadeTransitionDuration;

        activeVideo.style.transition = `opacity ${duration}ms ease-in-out`;
        inactiveVideo.style.transition = `opacity ${duration}ms ease-in-out`;

        inactiveVideo.style.opacity = "1";
        activeVideo.style.opacity = "0";

        // Swap classes after transition
        setTimeout(() => {
            activeVideo.classList.remove("active");
            activeVideo.classList.add("inactive");
            inactiveVideo.classList.remove("inactive");
            inactiveVideo.classList.add("active");

            // Update name if shown
            if (this.config.showName) {
                const nameElement = container.querySelector(".portrait-name");
                if (nameElement) {
                    nameElement.textContent = portrait.name || "";
                }
            }
        }, duration);
    },

    suspend: function () {
        // Stop rotation when module is hidden
        if (this.rotationTimer) {
            clearTimeout(this.rotationTimer);
        }
        // Stop schedule checker
        if (this.scheduleTimer) {
            clearInterval(this.scheduleTimer);
        }
    },

    resume: function () {
        // Resume schedule checker if enabled
        if (this.config.scheduleEnabled && this.config.schedules.length > 0) {
            this.startScheduleChecker();
        }
        // Resume rotation when module is shown again
        if (this.config.portraits.length > 1 && this.config.rotationInterval > 0) {
            this.scheduleRotation();
        }
    },

    notificationReceived: function (notification, payload, sender) {
        Log.info("MMM-MovingPortrait received notification: " + notification);

        switch (notification) {
            case "PORTRAIT_SHOW":
                this.showModule();
                break;
            case "PORTRAIT_HIDE":
                this.hideModule();
                break;
            case "PORTRAIT_TOGGLE":
                this.toggleModule();
                break;
            case "PORTRAIT_NEXT":
                this.rotatePortrait();
                break;
            case "PORTRAIT_PREVIOUS":
                this.previousPortrait();
                break;
            case "PORTRAIT_SELECT":
                this.selectPortrait(payload);
                break;
            case "PORTRAIT_PAUSE":
                this.pauseRotation();
                break;
            case "PORTRAIT_RESUME":
                this.resumeRotation();
                break;
            case "PORTRAIT_STOP_ROTATION":
                this.stopRotation();
                break;
        }
    },

    showModule: function () {
        Log.info("MMM-MovingPortrait: Show requested");
        this.isVisible = true;

        // Random portrait on show if enabled
        if (this.config.randomOnShow && this.config.portraits.length > 1) {
            this.currentIndex = Math.floor(Math.random() * this.config.portraits.length);
            Log.info("MMM-MovingPortrait: Random start at index " + this.currentIndex);
            this.updateDom(300);  // Update DOM to show new video
        }

        // MagicMirror's built-in show
        this.show(1000, { lockString: this.identifier });

        // Resume rotation
        if (!this.isRotationPaused && this.config.portraits.length > 1 && this.config.rotationInterval > 0) {
            this.scheduleRotation();
        }
    },

    hideModule: function () {
        this.isVisible = false;
        this.hide(1000, { lockString: this.identifier });

        // Pause videos
        const videos = document.querySelectorAll(".portrait-video");
        videos.forEach(v => v.pause());

        // Stop rotation
        if (this.rotationTimer) {
            clearTimeout(this.rotationTimer);
        }
        Log.info("MMM-MovingPortrait: Hidden");
    },

    toggleModule: function () {
        if (this.isVisible) {
            this.hideModule();
        } else {
            this.showModule();
        }
    },

    previousPortrait: function () {
        // Calculate previous index
        this.currentIndex = (this.currentIndex - 1 + this.config.portraits.length) % this.config.portraits.length;
        this.updatePortraitDisplay();

        // Reschedule rotation if enabled
        if (!this.isRotationPaused && this.config.portraits.length > 1 && this.config.rotationInterval > 0) {
            this.scheduleRotation();
        }
    },

    selectPortrait: function (payload) {
        if (!payload) {
            Log.warn("MMM-MovingPortrait: No payload provided for PORTRAIT_SELECT");
            return;
        }

        let newIndex = this.currentIndex;

        // Support selection by index
        if (payload.index !== undefined && payload.index >= 0 && payload.index < this.config.portraits.length) {
            newIndex = payload.index;
        }
        // Support selection by name
        else if (payload.name) {
            newIndex = this.config.portraits.findIndex(p => p.name === payload.name);
            if (newIndex === -1) {
                Log.warn("MMM-MovingPortrait: Portrait with name '" + payload.name + "' not found");
                return;
            }
        }

        if (newIndex === this.currentIndex) {
            return;  // Already showing this portrait
        }

        this.currentIndex = newIndex;
        this.updatePortraitDisplay();

        // Reschedule rotation if enabled
        if (!this.isRotationPaused && this.config.portraits.length > 1 && this.config.rotationInterval > 0) {
            this.scheduleRotation();
        }
    },

    pauseRotation: function () {
        if (!this.isRotationPaused) {
            this.isRotationPaused = true;
            if (this.rotationTimer) {
                clearTimeout(this.rotationTimer);
                this.rotationTimer = null;
            }
            Log.info("MMM-MovingPortrait: Rotation paused");
        }
    },

    resumeRotation: function () {
        if (this.isRotationPaused) {
            this.isRotationPaused = false;
            if (this.config.portraits.length > 1 && this.config.rotationInterval > 0) {
                this.scheduleRotation();
                Log.info("MMM-MovingPortrait: Rotation resumed");
            }
        }
    },

    stopRotation: function () {
        this.isRotationPaused = true;
        if (this.rotationTimer) {
            clearTimeout(this.rotationTimer);
            this.rotationTimer = null;
        }
        Log.info("MMM-MovingPortrait: Rotation stopped");
    },

    startScheduleChecker: function () {
        const self = this;

        // Check immediately on start
        this.checkSchedule();

        // Check every 30 seconds
        if (this.scheduleTimer) {
            clearInterval(this.scheduleTimer);
        }
        this.scheduleTimer = setInterval(function () {
            self.checkSchedule();
        }, 30000);
    },

    checkSchedule: function () {
        if (!this.config.scheduleEnabled || !this.config.schedules || this.config.schedules.length === 0) {
            return;
        }

        const now = new Date();
        const currentTime = ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2);

        let isInSchedule = false;

        // Check if current time falls within any schedule
        for (let schedule of this.config.schedules) {
            if (currentTime >= schedule.start && currentTime < schedule.end) {
                isInSchedule = true;
                break;
            }
        }

        // Show or hide based on schedule
        if (isInSchedule && this.isScheduleHidden) {
            // Time to show
            this.isScheduleHidden = false;
            const wrapper = document.querySelector(".mmm-moving-portrait-wrapper");
            if (wrapper) {
                wrapper.style.display = "block";
            }
            Log.info("MMM-MovingPortrait: Schedule triggered show");
            if (!this.isRotationPaused && this.config.portraits.length > 1 && this.config.rotationInterval > 0) {
                this.scheduleRotation();
            }
        } else if (!isInSchedule && !this.isScheduleHidden) {
            // Time to hide
            this.isScheduleHidden = true;
            const wrapper = document.querySelector(".mmm-moving-portrait-wrapper");
            if (wrapper) {
                wrapper.style.display = "none";
            }
            if (this.rotationTimer) {
                clearTimeout(this.rotationTimer);
            }
            Log.info("MMM-MovingPortrait: Schedule triggered hide");
        }
    },

    getStyles: function () {
        return ["MMM-MovingPortrait.css"];
    }
});