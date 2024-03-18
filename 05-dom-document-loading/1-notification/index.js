export default class NotificationMessage {
    element;
    lastMessage;

    constructor(
        message = '',
        {
            duration = 0,
            type = '',
        } = {}) {
        this.duration = duration;
        this.type = type;
        this.message = message;

        this.element = this.createElement(this.createTemplate());
    }

    show(container = document.body) {
        if (NotificationMessage.lastMessage) {
            NotificationMessage.lastMessage.remove();
          } 
          NotificationMessage.lastMessage = this;

        this.timerId = setTimeout(() => {
            this.destroy();
        }, this.duration);
    
        container.appendChild(this.element);    
    }

    createElement(template) {
        const element = document.createElement('div');
        element.innerHTML = template;
        return element.firstElementChild;
    }
    
    createTemplate() {
        return (`  
            <div class="notification ${this.type}" style="--value:${this.duration}">
                <div class="timer"></div>
                <div class="inner-wrapper">
                    <div class="notification-header">${this.type}</div>
                    <div class="notification-body">
                        ${this.message}
                    </div>
                </div>
            </div>
        `);
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
        clearTimeout(this.timerId);
    }

}
