let instance: NotificationEventSource | null = null;
let eventSource: EventSource | null = null;
 
class NotificationEventSource {
  constructor() {
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;
  }

  getInstance() {
    return this;
  }

  getStatus() {
    return eventSource?.readyState;
  }

  connect = (onEventSourceOpen: (event: Event) => void, onEventSourceMessage: (event: MessageEvent) => void, onEventSourceError: (event: Event) => void) => {
    if (eventSource?.readyState == EventSource.OPEN || eventSource?.readyState == EventSource.CONNECTING) {
        return;
    }
    eventSource = new EventSource("/api/notification/challenge-submission-update");
    eventSource.onopen = onEventSourceOpen;
    eventSource.onmessage = onEventSourceMessage;
    eventSource.onerror = onEventSourceError;
  };
 
  disconnect() {
    if (eventSource?.readyState == EventSource.OPEN || eventSource?.readyState == EventSource.CONNECTING) {
      eventSource.close();
    }
  }
}

const singletonNotificationEventSource = Object.freeze(new NotificationEventSource());
export default singletonNotificationEventSource;