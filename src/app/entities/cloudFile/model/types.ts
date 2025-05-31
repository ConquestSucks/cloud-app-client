import { BaseEntity } from "@/app/shared/model/types";

export interface CloudFile extends BaseEntity {
    userDisplayName: string;
    cloudFolderId?: number;
    publicUrl?: string;
    key: string;
    size: number;
    extension: string;
    downloadCount: number;
}

export interface GetFilesResponse {
    files: CloudFile[];
    headers: {
        "x-total-count": number;
        "x-total-pages": number;
    };
}

export const fileTypeIcons: Record<string, string> = {
    bmp: 'bmp-34.svg',
    csv: 'csv-13.svg',
    doc: 'doc-53.svg',
    docx: 'docx-10.svg',
    dps: 'dps.svg',
    dpt: 'dpt-1.svg',
    et: 'et-5.svg',
    ett: 'ett.svg',
    excel: 'excel-74.svg',
    flv: 'flv-8.svg',
    gif: 'gif-51.svg',
    image: 'image-151.svg',
    jpeg: 'jpeg-17.svg',
    jpg: 'jpg-48.svg',
    mp4: 'mp4-24.svg',
    other: 'other-71.svg',
    pdf: 'pdf-101.svg',
    png: 'png-55.svg',
    ppt: 'ppt-71.svg',
    pptx: 'pptx-5.svg',
    svg: 'svg-15.svg',
    tif: 'tif-6.svg',
    tiff: 'tiff-18.svg',
    txt: 'txt-59.svg',
    word: 'word-88.svg',
    wps: 'wps-4.svg',
    wpt: 'wpt-1.svg',
    wt: 'wt-1.svg',
    xls: 'xls-22.svg',
    xlsx: 'xlsx-11.svg',
    xml: 'xml-22.svg'
};