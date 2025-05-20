class UploadData {
  imageUrl: string;
  constructor(imageUrl: string) {
    this.imageUrl = imageUrl;
  }

  static parseJson(data: { ["vivacity"]: string }) {
    return new UploadData(data["vivacity"]);
  }
}

export { UploadData };
