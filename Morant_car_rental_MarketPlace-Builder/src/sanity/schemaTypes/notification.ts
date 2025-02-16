const notification = {
  name: "notification",
  title: "Notification",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "message",
      title: "Message",
      type: "text",
    },
    {
      name: "date",
      title: "Date",
      type: "datetime",
    },
    {
      name: "type",
      title: "Notification Type",
      type: "string",
      options: {
        list: [
          { title: "General", value: "general" },
          { title: "Car Booking", value: "car_booking" },
          { title: "User Message", value: "user_message" },
        ],
      },
    },
    {
      name: "userId",
      title: "User ID (For Personalized Messages)",
      type: "string",
      hidden: ({ parent }: { parent: { type: string } }) => parent?.type !== "user_message",
    },
  ],
};

export default notification;
