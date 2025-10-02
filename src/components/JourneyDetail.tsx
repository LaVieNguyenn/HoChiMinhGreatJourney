import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import image1911Saigon from '@/assets/journey/saigon-harbor-old-photo.jpg';
import image1911Singapore from '@/assets/journey/singapore-1911-colonial-harbour.jpg';
import image1911Colombo from '@/assets/journey/colombo-port-1910s.jpg';
import image1911PortSaid from '@/assets/journey/port-said-1911-suez-canal.jpg';
import image1911Marseille from '@/assets/journey/marseille-1911-vieux-port.jpg';
import image1911Martinique from '@/assets/journey/martinique-1910s-port.webp';
import image1912Argentina from '@/assets/journey/buenos-aires-1912-waterfront.jpeg';
import image1912America from '@/assets/journey/omni-parker-house-1913.jpeg';
import image1913England from '@/assets/journey/london-1914-street-scene.jpg';
import image1917Paris from '@/assets/journey/paris-1920s-champs-elysees-dusk.jpg';
import image1923Moscow from '@/assets/journey/moscow-red-square-1923.jpg';
import image1925Guangzhou from '@/assets/journey/guangzhou-1925-skyline.webp';
import image1930HongKong from '@/assets/journey/hong-kong-1930-kowloon-skyline.webp';
import image1941PacBo from '@/assets/journey/pac-bo-cave-cao-bang.jpg';

interface JourneyPoint {
  id: string;
  year: string;
  location: string;
  coordinates: [number, number];
  title: string;
  description: string;
  type: 'start' | 'journey' | 'revolutionary' | 'homeland';
}

interface JourneyDetailProps {
  point: JourneyPoint | null;
  onClose: () => void;
}

const detailedInfo: Record<string, {
  highlights: string[];
  significance: string;
  context: string;
  image?: {
    url: string;
    alt: string;
    caption?: string;
  };
}> = {
  '1911-saigon': {
    highlights: [
      'Lên tàu Amiral Latouche-Tréville với tên Văn Ba',
      'Làm phụ bếp, bắt đầu cuộc hành trình 30 năm',
      'Tuổi 21, đầy khát vọng tìm đường cứu nước'
    ],
    significance: 'Bước ngoặt quan trọng trong cuộc đời Người, khởi đầu cho hành trình tìm hiểu thế giới để cứu nước.',
    context: 'Thời kỳ thực dân Pháp đang củng cố quyền thống trị tại Đông Dương, người dân Việt Nam sống trong cảnh nô lệ.',
    image: {
      url: image1911Saigon,
      alt: 'Minh họa Bến Nhà Rồng tại Sài Gòn năm 1911',
      caption: 'Bến Nhà Rồng - điểm khởi hành lịch sử ngày 05/06/1911.',
    },
  },
  '1911-singapore': {
    highlights: [
      'Tàu Amiral Latouche-Tréville cập cảng Singapore sau vài ngày rời Sài Gòn',
      'Nguyễn Tất Thành quan sát hệ thống thuộc địa Anh lần đầu tiên',
      'Tiếp xúc với người lao động cảng và kiều bào Việt Nam tại Singapore'
    ],
    significance: 'Mốc dừng chân đầu tiên trên hành trình bôn ba, mở rộng tầm nhìn về vận hành của chủ nghĩa thực dân Anh.',
    context: 'Đầu thế kỷ XX, Singapore là cửa ngõ hàng hải chiến lược của Đông Nam Á do người Anh kiểm soát.',
    image: {
      url: image1911Singapore,
      alt: 'Bến cảng Singapore đầu thế kỷ XX với tàu hơi nước và nhà kho thuộc địa',
      caption: 'Cảng Singapore – điểm dừng đầu tiên ngày 08/06/1911.',
    },
  },
  '1911-colombo': {
    highlights: [
      'Tàu ghé cảng Colombo, Sri Lanka trên tuyến đường hàng hải Ấn Độ Dương',
      'Chứng kiến đời sống người Á dưới ách thống trị thực dân',
      'Đối chiếu tình cảnh thuộc địa châu Á với Việt Nam'
    ],
    significance: 'Củng cố nhận thức về sự áp bức dân tộc ở các thuộc địa khác nhau, nuôi dưỡng quyết tâm giải phóng.',
    context: 'Sri Lanka (Ceylon) chịu sự chi phối của Anh, là trạm trung chuyển chủ lực giữa Ấn Độ Dương và châu Âu.',
    image: {
      url: image1911Colombo,
      alt: 'Cảng Colombo những năm 1910 với tàu buồm và tàu hơi nước neo đậu',
      caption: 'Colombo – trạm trung chuyển nhộn nhịp của Ấn Độ Dương.',
    },
  },
  '1911-port-said': {
    highlights: [
      'Đi qua kênh đào Suez – tuyến hàng hải huyết mạch nối liền Địa Trung Hải và Ấn Độ Dương',
      'Quan sát hoạt động thương mại quốc tế quy mô lớn',
      'Nhận diện vai trò chiến lược của Ai Cập trong mạng lưới thuộc địa Pháp – Anh'
    ],
    significance: 'Hiểu rõ hơn sức mạnh kinh tế – quân sự của các cường quốc qua hệ thống vận tải quốc tế.',
    context: 'Port Said do Anh - Pháp kiểm soát, là cửa ngõ đi vào kênh đào Suez thời thuộc địa.',
    image: {
      url: image1911PortSaid,
      alt: 'Cảng Port Said và kênh đào Suez với ngọn hải đăng năm 1911',
      caption: 'Port Said – cửa ngõ bước vào Địa Trung Hải.',
    },
  },
  '1911-marseille': {
    highlights: [
      'Đặt chân tới Marseille – cảng biển lớn nhất miền Nam nước Pháp',
      'Tiếp xúc lần đầu với xã hội phương Tây công nghiệp hóa',
      'Ghi nhận sự tương phản giàu nghèo và tổ chức xã hội ở chính quốc Pháp'
    ],
    significance: 'Từ trải nghiệm trực tiếp với nước Pháp, Nguyễn Tất Thành tìm hiểu nguyên nhân thực dân đàn áp thuộc địa.',
    context: 'Marseille đầu thế kỷ XX là trung tâm giao thương, nơi thực dân Pháp vận chuyển nguồn lực từ thuộc địa.',
    image: {
      url: image1911Marseille,
      alt: 'Cảng Vieux-Port Marseille với tàu buồm và khu phố cổ năm 1911',
      caption: 'Marseille – lần đầu tiếp xúc với chính quốc Pháp.',
    },
  },
  '1911-martinique': {
    highlights: [
      'Qua vùng biển Caribbean và ghé Martinique – thuộc địa Pháp tại Trung Mỹ',
      'Chứng kiến đời sống lao động da màu trong đồn điền mía',
      'Tiếp tục tích lũy kinh nghiệm để so sánh chính sách thuộc địa ở nhiều khu vực'
    ],
    significance: 'Khẳng định tính chất toàn cầu của chủ nghĩa thực dân và sự cần thiết của đoàn kết các dân tộc bị áp bức.',
    context: 'Martinique dưới quyền Pháp, là điểm dừng bắt buộc của các tuyến tàu từ châu Phi sang châu Mỹ.',
    image: {
      url: image1911Martinique,
      alt: 'Cảnh cảng biển Martinique thập niên 1910 với núi và làng chài',
      caption: 'Martinique – dấu chân trên hành trình qua Caribe.',
    },
  },
  '1912-argentina': {
    highlights: [
      'Tàu ghé các cảng Nam Mỹ như Buenos Aires (Argentina) và Montevideo (Uruguay)',
      'Quan sát phong trào công nhân và cộng đồng di dân châu Âu',
      'Làm quen với phong trào giải phóng dân tộc tại Mỹ Latinh'
    ],
    significance: 'Bổ sung góc nhìn về phong trào yêu nước tại Nam Mỹ, so sánh với hoàn cảnh Việt Nam.',
    context: 'Đầu thế kỷ XX, Buenos Aires là đô thị phồn vinh bậc nhất Nam Mỹ với nhiều hoạt động cách mạng.',
    image: {
      url: image1912Argentina,
      alt: 'Bờ cảng Buenos Aires năm 1912 với nhà kho và tàu hơi nước',
      caption: 'Buenos Aires – nhịp sống sôi động của Nam Mỹ.',
    },
  },
  '1912-america': {
    highlights: [
      'Có bằng chứng thư từ chứng minh đã đến Mỹ',
      'Truyền thuyết làm việc tại Parker House (Boston)',
      'Quan sát xã hội tư bản phát triển',
      'Tích lũy kinh nghiệm sống và làm việc'
    ],
    significance: 'Lần đầu tiên tiếp xúc trực tiếp với nền văn minh phương Tây, hiểu được cả mặt tích cực và tiêu cực.',
    context: 'Hoa Kỳ đang trong thời kỳ công nghiệp hóa mạnh mẽ, nhiều cơ hội nhưng cũng nhiều bất công xã hội.',
    image: {
      url: image1912America,
      alt: 'Khách sạn Omni Parker House tại Boston năm 1913',
      caption: 'Khách sạn Parker House – nơi Người từng làm việc và sinh sống.',
    },
  },
  '1913-england': {
    highlights: [
      'Sinh hoạt và làm việc tại London, trung tâm của Đế quốc Anh',
      'Học tiếng Anh, tiếp cận báo chí tiến bộ và phong trào công nhân',
      'Quan sát đời sống thợ thuyền Docklands và kiều dân các thuộc địa Anh'
    ],
    significance: 'Tích lũy kinh nghiệm sống ở quốc gia tư bản hàng đầu, chuẩn bị cho các hoạt động tuyên truyền sau này.',
    context: 'London những năm 1913-1917 là đô thị công nghiệp sầm uất với phong trào lao động mạnh mẽ.',
    image: {
      url: image1913England,
      alt: 'Đường phố London năm 1914 với xe điện và tòa nhà cổ',
      caption: 'London – trung tâm công nghiệp và báo chí của Đế quốc Anh.',
    },
  },
  '1917-paris': {
    highlights: [
      'Dùng bút danh Nguyễn Ái Quốc',
      'Gửi Bản yêu sách 8 điểm đến Hội nghị Versailles',
      'Tham gia thành lập Đảng Cộng sản Pháp',
      'Sáng lập báo Le Paria năm 1922'
    ],
    significance: 'Giai đoạn hình thành tư tưởng cách mạng, từ chủ nghĩa yêu nước chuyển lên chủ nghĩa cộng sản.',
    context: 'Sau Thế chiến I, phong trào giải phóng dân tộc trên toàn thế giới nổi lên mạnh mẽ.',
    image: {
      url: image1917Paris,
      alt: 'Đại lộ Champs-Élysées Paris lúc hoàng hôn thập niên 1920',
      caption: 'Paris – trung tâm hoạt động cách mạng của Nguyễn Ái Quốc.',
    },
  },
  '1923-moscow': {
    highlights: [
      'Làm việc với Quốc tế Cộng sản (Comintern)',
      'Dự Đại hội V Comintern năm 1924',
      'Học tập lý luận Mác-Lênin một cách hệ thống',
      'Chuẩn bị kế hoạch hoạt động tại Châu Á'
    ],
    significance: 'Hoàn thiện hệ thống tư tưởng cách mạng, kết hợp chủ nghĩa yêu nước với chủ nghĩa quốc tế.',
    context: 'Liên Xô sau Cách mạng Tháng Mười đang xây dựng chế độ xã hội chủ nghĩa đầu tiên trên thế giới.',
    image: {
      url: image1923Moscow,
      alt: 'Quảng trường Đỏ và Thánh đường Saint Basil tại Moskva năm 1923',
      caption: 'Moskva – cái nôi đào tạo cán bộ cách mạng quốc tế.',
    },
  },
  '1925-guangzhou': {
    highlights: [
      'Thành lập Hội Việt Nam Cách mạng Thanh niên',
      'Biên soạn giáo trình "Đường Kách mệnh"',
      'Huấn luyện 200 cán bộ cách mạng',
      'Thiết lập mạng lưới hoạt động tại Việt Nam'
    ],
    significance: 'Bước chuẩn bị quan trọng cho việc thành lập Đảng Cộng sản tại Việt Nam.',
    context: 'Trung Quốc đang trong thời kỳ hợp tác Quốc-Cộng lần thứ nhất, cơ hội thuận lợi cho hoạt động cách mạng.',
    image: {
      url: image1925Guangzhou,
      alt: 'Đường chân trời Quảng Châu những năm 1920 với kiến trúc kết hợp Đông – Tây',
      caption: 'Quảng Châu – trung tâm huấn luyện thanh niên cách mạng Việt Nam.',
    },
  },
  '1930-hongkong': {
    highlights: [
      'Chủ trì Hội nghị hợp nhất tại Kowloon',
      'Hợp nhất 3 tổ chức cộng sản Bắc-Trung-Nam',
      'Thành lập Đảng Cộng sản Việt Nam',
      'Thông qua Cương lĩnh chính trị đầu tiên'
    ],
    significance: 'Sự kiện lịch sử quan trọng nhất - ra đời đảng của giai cấp công nhân Việt Nam.',
    context: 'Cao trào cách mạng 1930-1931 đang bùng nổ, cần có sự lãnh đạo thống nhất của Đảng.',
    image: {
      url: image1930HongKong,
      alt: 'Cảng Victoria Hồng Kông nhìn từ Cửu Long thập niên 1930',
      caption: 'Hồng Kông – nơi diễn ra Hội nghị hợp nhất đầu năm 1930.',
    },
  },
  '1941-pacbo': {
    highlights: [
      'Trở về sau gần 30 năm bôn ba',
      'Chọn Pác Bó làm căn cứ cách mạng',
      'Trực tiếp lãnh đạo cách mạng trong nước',
      'Chuẩn bị cho Cách mạng Tháng Tám'
    ],
    significance: 'Kết thúc hành trình tìm đường cứu nước, bắt đầu giai đoạn trực tiếp lãnh đạo giải phóng dân tộc.',
    context: 'Thế chiến II bùng nổ, cơ hội lịch sử để giành độc lập cho dân tộc Việt Nam.',
    image: {
      url: image1941PacBo,
      alt: 'Hang Pác Bó và suối Lê Nin tại Cao Bằng',
      caption: 'Pác Bó – căn cứ đầu não khi Chủ tịch Hồ Chí Minh trở về Tổ quốc.',
    },
  }
};

const JourneyDetail: React.FC<JourneyDetailProps> = ({ point, onClose }) => {
  if (!point) return null;

  const info = detailedInfo[point.id] || {
    highlights: [],
    significance: '',
    context: '',
    image: undefined,
  };

  const getHeaderClass = () => {
    switch (point.type) {
      case 'start':
      case 'homeland':
        return 'bg-gradient-to-r from-accent to-accent-glow';
      case 'revolutionary':
        return 'bg-gradient-to-r from-primary to-primary-glow';
      default:
        return 'bg-gradient-to-r from-secondary to-secondary-glow';
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fadeIn">
        <div className={`${getHeaderClass()} p-6 text-white relative`}>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="space-y-2">
            <div className="text-sm opacity-90">{point.year}</div>
            <h2 className="text-2xl font-bold">{point.title}</h2>
            <p className="text-lg opacity-90">{point.location}</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {info.image && (
            <div className="overflow-hidden rounded-lg border border-border/60">
              <img
                src={info.image.url}
                alt={info.image.alt}
                loading="lazy"
                className="h-60 w-full object-cover"
              />
              {info.image.caption && (
                <p className="bg-muted/40 px-4 py-2 text-xs text-muted-foreground">
                  {info.image.caption}
                </p>
              )}
            </div>
          )}

          <div>
            <p className="text-lg text-foreground leading-relaxed">
              {point.description}
            </p>
          </div>

          {info.highlights.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">
                Điểm nổi bật
              </h3>
              <div className="space-y-2">
                {info.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 animate-slideUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-primary mt-1 text-lg">•</span>
                    <span className="text-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {info.significance && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">
                Ý nghĩa lịch sử
              </h3>
              <p className="text-foreground leading-relaxed bg-muted/30 p-4 rounded-lg">
                {info.significance}
              </p>
            </div>
          )}

          {info.context && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">
                Bối cảnh thời đại
              </h3>
              <p className="text-muted-foreground leading-relaxed italic">
                {info.context}
              </p>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <Button onClick={onClose} variant="outline">
              Đóng
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default JourneyDetail;
