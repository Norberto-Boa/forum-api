export class Slug {
  public value: string;

  constructor(value: string) {
    this.value = value;
  }

  /**
   * Receives a string and normalizes it as a slug
   *
   * Example: "A super nice title" => "a-super-nice-title"
   *
   * @param text {string}
   */
  static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Remove whitespaces
      .replace(/[^\w-]+/g, '') // Get everything that isn't a word
      .replace(/_/g, '-') // Get all underscore and change to hifen
      .replace(/--+/g, '-') // Remove duplicates hifens
      .replace(/-$/g, ''); // Remove every hifen at the end

    return new Slug(slugText);
  }
}
