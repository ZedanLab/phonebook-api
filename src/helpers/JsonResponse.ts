export class JsonResponse {
  message: string;
  data: unknown;
  total?: number;
  currentPage?: number;
  eachPage?: number;
  lastPage?: number;
  link?: string;

  constructor(
    message: string,
    data: unknown,
    total?: number,
    currentPage?: number,
    eachPage?: number,
    link?: string,
  ) {
    this.message = message ?? 'OK';
    this.data = data;
    this.total = total ?? 1;
    this.eachPage = eachPage;
    this.currentPage = currentPage;
    this.link = link;
    this.lastPage = total && eachPage ? Math.ceil(total / eachPage) : undefined;
  }

  json({ meta = false, links = false }: { meta?: boolean; links?: boolean }) {
    return {
      success: true,
      message: this.message,
      data: this.data,
      meta: meta && this._buildMeta(),
      links: links && this._buildLinks(),
    };
  }

  private _buildMeta() {
    return {
      total: this.total,
      currentPage: this.currentPage,
      eachPage: this.eachPage,
      lastPage: this.lastPage,
    };
  }

  private _buildLinks() {
    if (
      this.link === undefined ||
      this.eachPage === undefined ||
      this.lastPage === undefined ||
      this.currentPage === undefined
    )
      return;

    const url = new URL(this.link);
    url.searchParams.set('paginate', this.eachPage.toString());

    url.searchParams.set('page', (this.currentPage + 1).toString());
    const next = this.lastPage <= this.currentPage ? null : url.href;

    url.searchParams.set('page', (this.currentPage - 1).toString());
    const prev = this.currentPage == 1 ? null : url.href;

    url.searchParams.set('page', '1');
    const first = url.href;

    url.searchParams.set('page', this.lastPage.toString());
    const last = url.href;

    return {
      first,
      next,
      prev,
      last,
    };
  }
}
