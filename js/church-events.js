const churchEvents = [
  // Add events as { date: "YYYY-MM-DD", title: "Event name", time: "6:00 PM" }.
  { date: "2026-12-13", title: "Billy Ballenger", time: "10:00 AM", website: "https://billyballenger.com" },

  { date: "2027-01-09", title: "Every second Saturday of the month", time: "10:00 AM", website: "https://www.livingmannaministries.org/ministries/men-fellowship" },
];

const eventsContainer = document.querySelector("#church-upcoming-events");

if (eventsContainer) {
  const now = new Date();
  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0")
  ].join("-");
  const upcomingEvents = churchEvents
    .filter(event => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

  if (upcomingEvents.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "upcoming-events-empty";
    emptyMessage.textContent = "No upcoming events are scheduled right now. Please check back soon.";
    eventsContainer.append(emptyMessage);
  }

  for (const event of upcomingEvents) {
    const [year, month, day] = event.date.split("-").map(Number);
    const eventDate = new Date(year, month - 1, day);
    const eventCard = document.createElement("article");
    const dateBadge = document.createElement("time");
    const eventDetails = document.createElement("div");
    const title = document.createElement("h3");

    eventCard.className = "upcoming-event";
    dateBadge.className = "upcoming-event-date";
    dateBadge.dateTime = event.date;

    const monthLabel = document.createElement("span");
    monthLabel.className = "month";
    monthLabel.textContent = new Intl.DateTimeFormat(undefined, { month: "short" }).format(eventDate);

    const dayLabel = document.createElement("span");
    dayLabel.className = "day";
    dayLabel.textContent = String(day);

    const yearLabel = document.createElement("span");
    yearLabel.className = "year";
    yearLabel.textContent = String(year);
    dateBadge.append(monthLabel, dayLabel, yearLabel);

    eventDetails.className = "upcoming-event-details";
    title.textContent = event.title;
    eventDetails.append(title);
    const eventMeta = document.createElement("div");
    eventMeta.className = "upcoming-event-meta";

    if (event.time) {
      const eventTime = document.createElement("time");
      eventTime.textContent = event.time;
      eventMeta.append(eventTime);
    }

    if (event.website) {
      const websiteLink = document.createElement("a");
      websiteLink.className = "upcoming-event-website";
      websiteLink.href = event.website;
      websiteLink.target = "_blank";
      websiteLink.rel = "noopener noreferrer";
      websiteLink.textContent = "Event website ↗";
      eventMeta.append(websiteLink);
    }

    if (eventMeta.childElementCount) {
      eventDetails.append(eventMeta);
    }

    eventCard.append(dateBadge, eventDetails);
    eventsContainer.append(eventCard);
  }
}
