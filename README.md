# Ho Chi Minh Journeys Map

Ung dung web tuong tac mo ta hanh trinh 30 nam (1911-1941) cua Chu tich Ho Chi Minh. Du an ket hop ban do, dong thoi gian, thong tin chi tiet va bo cau hoi on tap de ho tro trinh bay lich su mot cach sinh dong va de tiep can.

## Tinh nang noi bat
- Ban do hanh trinh voi cac moc dia ly, hinh anh minh hoa va tich hop thong tin chi tiet
- Dong bo voi dong thoi gian va khu vuc chi tiet giup theo doi dien bien theo nam
- Che do ke chuyen tu dong (Speech Synthesis) kem nhac nen, dieu chinh toc do doc va dieu khien nhanh
- Trang tong quan thong ke thong tin quan trong, gach dau dong thanh tuu va cac giai doan chinh
- Hoi thoai cau do nhanh de kiem tra kien thuc sau khi tham quan du lieu
- Ho tro che do sang/toi, tuong thich tot voi thiet bi di dong

## Cong nghe su dung
- Vite + React + TypeScript
- Tailwind CSS va shadcn/ui cho he thong giao dien
- React Router DOM cho dieu huong trang don
- Lucide React va cac goi Radix UI ho tro tuong tac, accessibility
- TanStack Query cho cac logic bat dong bo (neu can bo sung API sau nay)

## Yeu cau he thong
- Node.js >= 18
- npm >= 9 (hoac su dung bun/pnpm/ yarn neu dieu chinh script tuong ung)

## Cai dat va chay local
```sh
# 1. Cai dat phu thuoc
npm install

# 2. Chay che do phat trien
npm run dev

# 3. Xay dung bundle san san xuat
npm run build

# 4. Xem thu ban build
npm run preview

# 5. Kiem tra lint
npm run lint
```

## Cau truc thu muc chinh
```
├── public/                 # Static asset phuc vu truc tiep boi Vite
├── src/
│   ├── assets/             # Hinh anh, am thanh va du lieu hanh trinh (SVG, MP3...)
│   ├── components/         # Thanh phan UI: ban do, dong thoi gian, dialog cau do, theming...
│   ├── pages/              # Trang cap cao (Index) ket hop cac thanh phan
│   └── lib|hooks (neu co)  # Tien ich chuyen dung
├── index.html              # Template goc cho Vite
├── tailwind.config.ts      # Cau hinh Tailwind CSS
└── vite.config.ts          # Cau hinh build va plugin cua Vite
```

## Phat trien, dong gop
- Code duoc viet voi TypeScript; giu typing ro rang va tranh `any`
- Uu tien viet component co the tai su dung va co comment ngan gon neu doan logic phuc tap
- Luon chay `npm run lint` truoc khi day code len kho
- Neu bo sung noi dung lich su moi, nhac cap nhat `JourneyMap`, `Timeline` va `JourneyDetail` de dong bo thong tin

## Phat hanh
Du an co the duoc build thanh bo static asset (thu muc `dist/`) va trien khai tren bat ky hosting static nao (Netlify, Vercel, GitHub Pages...).

## Ban quyen
Noi dung lich su duoc tong hop tu nhieu nguon mo cong cong. Can dam bao tinh chinh xac khi cap nhat thong tin moi.
