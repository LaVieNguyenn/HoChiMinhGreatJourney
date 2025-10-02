import React from 'react';
import { Card } from '@/components/ui/card';

export interface TimelineEvent {
  id: string;
  year: string;
  period: string;
  title: string;
  description: string;
  details: string[];
  type: 'start' | 'journey' | 'revolutionary' | 'homeland';
}

interface TimelineProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  onStepSelect?: (event: TimelineEvent, index: number) => void;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: '1911-saigon',
    year: '1911',
    period: '05/6/1911',
    title: 'Khởi đầu hành trình tìm đường cứu nước',
    description: 'Rời bến Nhà Rồng (Sài Gòn) với tên Văn Ba',
    details: [
      'Làm phụ bếp trên tàu Amiral Latouche-Tréville',
      'Đây là khởi đầu chuyến đi tìm đường cứu nước',
      'Tuổi 21, quyết tâm tìm hiểu thế giới bên ngoài'
    ],
    type: 'start'
  },
  {
    id: '1911-singapore',
    year: '8/6/1911',
    period: '8/6/1911',
    title: 'Singapore - Điểm dừng đầu tiên',
    description: 'Tàu cập cảng Singapore',
    details: [
      'Bắt đầu hành trình vòng quanh thế giới',
      'Trải nghiệm đầu tiên ở xứ người',
      'Quan sát cuộc sống ở thuộc địa Anh'
    ],
    type: 'journey'
  },
  {
    id: '1911-colombo',
    year: '14/6/1911',
    period: '14/6/1911',
    title: 'Colombo - Qua eo biển Ấn Độ Dương',
    description: 'Tàu ghé Sri Lanka',
    details: [
      'Đi qua Ấn Độ Dương rộng lớn',
      'Nhìn thấy cảnh sống của dân châu Á',
      'Trên đường sang châu Phi'
    ],
    type: 'journey'
  },
  {
    id: '1911-port-said',
    year: '30/6/1911',
    period: '30/6/1911',
    title: 'Port Said - Qua kênh đào Suez',
    description: 'Tới Ai Cập, cửa ngõ từ Biển Đỏ vào Địa Trung Hải',
    details: [
      'Đi qua kênh đào Suez nổi tiếng',
      'Cảnh quan sa mạc Ai Cập',
      'Cửa ngõ giữa Á-Phi và châu Âu'
    ],
    type: 'journey'
  },
  {
    id: '1911-marseille',
    year: '6/7/1911',
    period: '6/7/1911',
    title: 'Marseille - Đặt chân lên châu Âu',
    description: 'Tàu cập cảng miền Nam nước Pháp',
    details: [
      'Lần đầu tiên tới châu Âu',
      'Thấy sự phồn thịnh của thế giới phương Tây',
      'Bắt đầu hiểu về sức mạnh thực dân'
    ],
    type: 'journey'
  },
  {
    id: '1911-martinique',
    year: 'Cuối 1911',
    period: 'Cuối 1911',
    title: 'Martinique - Qua Trung Mỹ',
    description: 'Đi qua Caribbean',
    details: [
      'Trải nghiệm vùng Caribbean',
      'Thấy ảnh hưởng của thực dân Pháp',
      'Trên đường sang châu Mỹ'
    ],
    type: 'journey'
  },
  {
    id: '1912-argentina',
    year: 'Đầu 1912',
    period: 'Đầu 1912',
    title: 'Argentina - Nam Mỹ',
    description: 'Ghé Argentina và Uruguay',
    details: [
      'Trải nghiệm châu Mỹ La-tinh',
      'Thấy cuộc sống ở Nam Mỹ',
      'Hiểu thêm về thế giới tư bản'
    ],
    type: 'journey'
  },
  {
    id: '1912-america',
    year: '1912-1913',
    period: '1912–1913',
    title: 'Hoa Kỳ - Tìm hiểu phương Tây',
    description: 'Làm việc tại Boston',
    details: [
      'Làm việc ở Boston (Parker House)',
      'Tự học và quan sát xã hội tư bản',
      'Tích lũy kinh nghiệm về thế giới phương Tây',
      'Hiểu rõ bản chất của chế độ tư bản'
    ],
    type: 'journey'
  },
  {
    id: '1913-england',
    year: '1913-1917',
    period: '1913–1917',
    title: 'Anh Quốc - Làm thuê tự học',
    description: 'Làm việc ở London',
    details: [
      'Làm thuê ở London để sinh sống',
      'Tiếp tục tự học và rèn luyện',
      'Quan sát trung tâm đế quốc Anh',
      'Tích lũy kiến thức về cách mạng'
    ],
    type: 'journey'
  },
  {
    id: '1917-paris',
    year: '1917-1923',
    period: '1917–1923',
    title: 'Paris - Nguyễn Ái Quốc ra đời',
    description: 'Hoạt động cách mạng tại Pháp',
    details: [
      '06/1919: Gửi "Bản yêu sách 8 điểm" đến Hội nghị Versailles',
      '12/1920: Đại hội Tours - tham gia thành lập Đảng Cộng sản Pháp',
      '1922: Sáng lập báo Le Paria cho các dân tộc thuộc địa',
      '1925: Xuất bản "Bản án chế độ thực dân Pháp"'
    ],
    type: 'revolutionary'
  },
  {
    id: '1923-moscow',
    year: '1923-1924',
    period: '1923–1924',
    title: 'Moskva - Học tập chủ nghĩa Mác-Lênin',
    description: 'Làm việc với Quốc tế Cộng sản',
    details: [
      'Dự Đại hội V Comintern (1924)',
      'Học tập lý luận cách mạng',
      'Chuẩn bị cho hoạt động ở Châu Á',
      'Sau đó đi Quảng Châu với bí danh Lý Thuỵ'
    ],
    type: 'revolutionary'
  },
  {
    id: '1925-guangzhou',
    year: '1925-1927',
    period: '1925–1927',
    title: 'Quảng Châu - Thành lập Thanh niên',
    description: 'Sáng lập tổ chức cách mạng đầu tiên',
    details: [
      'Thành lập Hội Việt Nam Cách mạng Thanh niên',
      'Tiền thân trực tiếp của phong trào cộng sản VN',
      'Biên soạn giáo trình "Đường Kách mệnh" (1927)',
      'Huấn luyện cán bộ cách mạng cho Việt Nam'
    ],
    type: 'revolutionary'
  },
  {
    id: '1930-hongkong',
    year: '1930',
    period: '03–07/02/1930',
    title: 'Hồng Kông - Thành lập Đảng',
    description: 'Hội nghị hợp nhất lịch sử',
    details: [
      'Chủ trì Hội nghị hợp nhất các tổ chức cộng sản',
      'Thành lập Đảng Cộng sản Việt Nam',
      'Thông qua Cương lĩnh chính trị vắn tắt',
      '10/1930: Đổi tên thành Đảng Cộng sản Đông Dương'
    ],
    type: 'revolutionary'
  },
  {
    id: '1941-pacbo',
    year: '1941',
    period: '28/01/1941',
    title: 'Trở về Tổ quốc',
    description: 'Pác Bó, Cao Bằng - Trực tiếp lãnh đạo',
    details: [
      'Sau gần 30 năm bôn ba khắp thế giới',
      'Chọn Pác Bó làm căn cứ cách mạng',
      'Trực tiếp lãnh đạo cách mạng giai đoạn mới',
      'Chuẩn bị cho cuộc Tổng khởi nghĩa Tháng Tám'
    ],
    type: 'homeland'
  }
];

const Timeline: React.FC<TimelineProps> = ({ currentStep, onStepChange, onStepSelect }) => {
  const getEventClass = (event: TimelineEvent, index: number) => {
    const isActive = index === currentStep;
    const isPassed = index < currentStep;
    const baseClass = "timeline-card cursor-pointer";
    
    if (isActive) {
      switch (event.type) {
        case 'start':
          return `${baseClass} border-accent shadow-[var(--shadow-homeland)] scale-105`;
        case 'revolutionary':
          return `${baseClass} border-primary shadow-[var(--shadow-revolutionary)] scale-105`;
        case 'homeland':
          return `${baseClass} border-accent shadow-[var(--shadow-homeland)] scale-105`;
        default:
          return `${baseClass} border-secondary shadow-[var(--shadow-golden)] scale-105`;
      }
    }
    
    if (isPassed) {
      return `${baseClass} opacity-70 border-muted`;
    }
    
    return `${baseClass} opacity-50 border-border hover:opacity-80`;
  };

  const getYearClass = (event: TimelineEvent, index: number) => {
    const isActive = index === currentStep;
    
    if (isActive) {
      switch (event.type) {
        case 'start':
        case 'homeland':
          return "text-2xl font-bold bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent";
        case 'revolutionary':
          return "text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent";
        default:
          return "text-2xl font-bold bg-gradient-to-r from-secondary to-secondary-glow bg-clip-text text-transparent";
      }
    }
    
    return "text-xl font-semibold text-muted-foreground";
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="hero-title mb-4">
          Hành Trình Tìm Đường Cứu Nước
        </h2>
        <p className="text-lg text-muted-foreground">
          1911 - 1941: Ba mươi năm bôn ba khắp thế giới
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {timelineEvents.map((event, index) => {
          const handleSelect = () => {
            onStepChange(index);
            onStepSelect?.(event, index);
          };

          return (
          <Card
            key={event.id}
            className={getEventClass(event, index)}
            data-timeline-step={event.id}
            role="button"
            tabIndex={0}
            onClick={handleSelect}
            onKeyDown={(eventKey) => {
              if (eventKey.key === 'Enter' || eventKey.key === ' ') {
                eventKey.preventDefault();
                handleSelect();
              }
            }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={getYearClass(event, index)}>
                  {event.year}
                </span>
                <span className="text-sm text-muted-foreground">
                  {event.period}
                </span>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  {event.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-3">
                  {event.description}
                </p>
              </div>

              {index <= currentStep && (
                <div className="space-y-2 animate-slideUp">
                  {event.details.map((detail, detailIndex) => (
                    <div
                      key={detailIndex}
                      className="flex items-start gap-2 text-sm"
                      style={{ animationDelay: `${detailIndex * 0.1}s` }}
                    >
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground">{detail}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
          );
        })}
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center mt-8">
        <div className="flex space-x-2">
          {timelineEvents.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? 'bg-primary scale-125'
                  : index < currentStep
                  ? 'bg-muted-foreground'
                  : 'bg-border hover:bg-muted'
              }`}
              onClick={() => onStepChange(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
