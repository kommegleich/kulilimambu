/**
 * 포트폴리오 작품 목록
 * 이미지: images/ 폴더에 넣고 src를 "/images/파일명.jpg" 로 지정
 * 상세 페이지: href를 "/work/작품슬러그" 로 하면 나중에 상세 페이지 연결 가능
 */
export type WorkItem = {
  id: string;
  type: "image" | "video";
  src: string;
  href: string;
  alt: string;
  /** 나중에 상세 페이지에서 쓸 제목 (선택) */
  title?: string;
};

export const WORKS: WorkItem[] = [
  {
    id: "1",
    type: "image",
    src: "https://picsum.photos/400/400?random=1",
    href: "#",
    alt: "작품 1",
    title: "작품 1",
  },
  {
    id: "2",
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    href: "#",
    alt: "작품 2",
    title: "작품 2",
  },
  {
    id: "3",
    type: "image",
    src: "https://picsum.photos/400/400?random=3",
    href: "#",
    alt: "작품 3",
    title: "작품 3",
  },
  {
    id: "4",
    type: "image",
    src: "https://picsum.photos/400/400?random=4",
    href: "#",
    alt: "작품 4",
    title: "작품 4",
  },
  {
    id: "5",
    type: "image",
    src: "https://picsum.photos/400/400?random=5",
    href: "#",
    alt: "작품 5",
    title: "작품 5",
  },
  {
    id: "6",
    type: "image",
    src: "https://picsum.photos/400/400?random=6",
    href: "#",
    alt: "작품 6",
    title: "작품 6",
  },
];
