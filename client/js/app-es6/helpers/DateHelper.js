class DateHelper {
  static dateToText(date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  static textToDate(text) {
    if(!/\d{2}\/\d{2}\/\d{4}/.test(text)) {
      throw new Error("Data no formato diferente de mm-dd-yyyy");
    }
    return new Date(...text.split("/").reverse().map((item, index) => item - index % 2));
  }
}
