import { notificationService } from "@hope-ui/solid";

export default function createNotification(status, title, description) {
  notificationService.show({
    status,
    title,
    description
  }
  );
}