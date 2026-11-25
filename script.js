gsap.utils.toArray(".animate-fade").forEach(el => {
    gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 1,
        scrollTrigger: {
            trigger: el,
            start: "top 80%"
        }
    });
});

gsap.from(".animate-slide", {
    x: -100,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: ".animate-slide",
        start: "top 80%"
    }
});

gsap.from(".animate-slide-left", {
    x: -50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: ".animate-slide-left",
        start: "top 80%"
    }
});

gsap.from(".animate-slide-right", {
    x: 50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: ".animate-slide-right",
        start: "top 80%"
    }
});

gsap.utils.toArray(".animate-module").forEach((el, index) => {
    gsap.from(el, {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        delay: index * 0.2,
        scrollTrigger: {
            trigger: el,
            start: "top 80%"
        }
    });
});

document.querySelectorAll(".module-item").forEach(item => {
    item.addEventListener("click", () => {
        const details = item.querySelector(".module-details");
        details.style.display = details.style.display === "block" ? "none" : "block";
    });
});

const typewriter = document.querySelector(".typewriter");
const text = typewriter.textContent;
typewriter.textContent = "";
let i = 0;
function type() {
    if (i < text.length) {
        typewriter.textContent += text.charAt(i);
        i++;
        setTimeout(type, 50);
    }
}
gsap.from(typewriter, {
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: typewriter,
        start: "top 80%",
        onEnter: () => type()
    }
});

const cursorDot = document.querySelector(".cursor-dot");
document.addEventListener("mousemove", (e) => {
    cursorDot.style.left = e.clientX + "px";
    cursorDot.style.top = e.clientY + "px";
});

const portfolioGrid = document.querySelector(".portfolio-grid");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

leftArrow.addEventListener("click", () => {
    portfolioGrid.scrollBy({ left: -300, behavior: "smooth" });
});

rightArrow.addEventListener("click", () => {
    portfolioGrid.scrollBy({ left: 300, behavior: "smooth" });
});

document.querySelectorAll(".logos-container, .portfolio-grid").forEach(container => {
    container.addEventListener("mouseenter", () => {
        cursorDot.classList.add("expand");
    });
    container.addEventListener("mouseleave", () => {
        cursorDot.classList.remove("expand");
    });

    let isDragging = false;
    let startX;
    let scrollLeft;

    container.addEventListener("mousedown", (e) => {
        isDragging = true;
        container.classList.add("dragging");
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener("mouseleave", () => {
        isDragging = false;
        container.classList.remove("dragging");
    });

    container.addEventListener("mouseup", () => {
        isDragging = false;
        container.classList.remove("dragging");
    });

    container.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });
});

const sendMessageBtn = document.querySelector(".send-message-btn");
function createRipple(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;

    const ripple = document.createElement("span");
    ripple.classList.add("ripple");

    const touchX = event.clientX || (event.touches && event.touches[0].clientX);
    const touchY = event.clientY || (event.touches && event.touches[0].clientY);

    const x = touchX - rect.left - radius;
    const y = touchY - rect.top - radius;

    ripple.style.width = `${diameter}px`;
    ripple.style.height = `${diameter}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    button.appendChild(ripple);

    ripple.addEventListener("animationend", () => {
        ripple.remove();
    });
}

sendMessageBtn.addEventListener("mousedown", createRipple);
sendMessageBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    createRipple(e);
});