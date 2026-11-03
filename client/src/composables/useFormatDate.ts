
type DateFormat = "date" | "datetime";

export function useFormatDate() {
  function formatDate(
    value: string | Date | null | undefined,
    format: DateFormat = "date",
  ): string {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "";

    return new Intl.DateTimeFormat("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      ...(format === "datetime" && {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }).format(date);
  }

  return {
    formatDate,
  };
}
