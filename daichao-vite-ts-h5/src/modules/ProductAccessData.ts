interface GriefsData {
  ["boasting"]: number;
  ["amply"]?: string;
  ["godfather"]?: string;
  ["bequeathed"]?: string[];
  ["eligible"]?: number;
  ["solitude"]?: number;
  ["procured"]: string;
  ["vivacity"]: string;
  ["intelligible"]?: string;
  ["topics"]?: string;
  ["shoe"]?: number;
}

class ProductAccessData {
  url: string;

  constructor(params: { url: string }) {
    this.url = params.url;
  }

  static parseJson(data: Partial<GriefsData> | null): ProductAccessData {
    return new ProductAccessData({
      url: (data && data["vivacity"]) || "",
    });
  }
}

export { ProductAccessData };
