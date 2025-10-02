import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import worldMapBackground from '@/assets/world-map-background.jpg';

export interface JourneyPoint {
  id: string;
  year: string;
  location: string;
  coordinates: [number, number];
  latLng: [number, number]; // [latitude, longitude]
  title: string;
  description: string;
  type: 'start' | 'journey' | 'revolutionary' | 'homeland';
}

// Convert lat/lng to pixel coordinates for our world map using more accurate Mercator projection
const latLngToPixel = (lat: number, lng: number): [number, number] => {
  // For SVG viewBox 0 0 100 100
  const MAP_WIDTH = 100;
  const MAP_HEIGHT = 100;
  
  // Convert longitude (-180 to 180) to x coordinate (0 to 100)
  const x = ((lng + 180) * MAP_WIDTH) / 360;
  
  // Convert latitude using Web Mercator projection (more accurate for world maps)
  // Clamp latitude to avoid singularities at poles
  const latRad = Math.max(-85, Math.min(85, lat)) * Math.PI / 180;
  const mercatorY = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  
  // Normalize to 0-1 range, then scale to map height
  // Web Mercator bounds: approximately -PI to PI
  const normalizedY = (mercatorY + Math.PI) / (2 * Math.PI);
  const y = (1 - normalizedY) * MAP_HEIGHT; // Flip Y axis (0 at top)
  
  return [Math.round(x * 100) / 100, Math.round(y * 100) / 100];
};

interface JourneyMapProps {
  currentStep: number;
  onPointClick: (point: JourneyPoint) => void;
}

export const journeyPoints: JourneyPoint[] = [
  {
    id: '1911-saigon',
    year: '1911',
    location: 'Sài Gòn, Việt Nam',
    latLng: [10.8231, 106.6297], // Ho Chi Minh City, Vietnam
    coordinates: latLngToPixel(10.8231, 106.6297),
    title: 'Khởi đầu hành trình',
    description: 'Rời bến Nhà Rồng với tên Văn Ba, làm phụ bếp trên tàu Amiral Latouche-Tréville',
    type: 'start'
  },
  {
    id: '1911-singapore',
    year: '8/6/1911',
    location: 'Singapore',
    latLng: [1.3521, 103.8198], // Singapore
    coordinates: latLngToPixel(1.3521, 103.8198),
    title: 'Điểm dừng đầu tiên',
    description: 'Tàu cập cảng Singapore, bắt đầu hành trình vòng quanh thế giới',
    type: 'journey'
  },
  {
    id: '1911-colombo',
    year: '14/6/1911',
    location: 'Colombo, Sri Lanka',
    latLng: [6.9271, 79.8612], // Colombo, Sri Lanka
    coordinates: latLngToPixel(6.9271, 79.8612),
    title: 'Qua eo biển Ấn Độ Dương',
    description: 'Tàu ghé Colombo, Sri Lanka trên đường sang châu Phi',
    type: 'journey'
  },
  {
    id: '1911-port-said',
    year: '30/6/1911',
    location: 'Port Said, Ai Cập',
    latLng: [31.2564, 32.3019], // Port Said, Egypt (chính xác hơn)
    coordinates: latLngToPixel(31.2564, 32.3019),
    title: 'Qua kênh đào Suez',
    description: 'Tới Port Said, Ai Cập - cửa ngõ từ Biển Đỏ vào Địa Trung Hải',
    type: 'journey'
  },
  {
    id: '1911-marseille',
    year: '6/7/1911',
    location: 'Marseille, Pháp',
    latLng: [43.2965, 5.3698], // Marseille, France
    coordinates: latLngToPixel(43.2965, 5.3698),
    title: 'Đặt chân lên châu Âu',
    description: 'Tàu cập cảng Marseille, miền Nam nước Pháp',
    type: 'journey'
  },
  {
    id: '1911-martinique',
    year: 'Cuối 1911',
    location: 'Martinique',
    latLng: [14.6415, -61.0242], // Fort-de-France, Martinique
    coordinates: latLngToPixel(14.6415, -61.0242),
    title: 'Qua Trung Mỹ',
    description: 'Đi qua Martinique (Trung Mỹ) trên đường sang châu Mỹ',
    type: 'journey'
  },
  {
    id: '1912-argentina',
    year: 'Đầu 1912',
    location: 'Argentina',
    latLng: [-34.6037, -58.3816], // Buenos Aires, Argentina
    coordinates: latLngToPixel(-34.6037, -58.3816),
    title: 'Nam Mỹ',
    description: 'Ghé Argentina và Uruguay (Nam Mỹ)',
    type: 'journey'
  },
  {
    id: '1912-america',
    year: '1912-1913',
    location: 'Hoa Kỳ',
    latLng: [42.3601, -71.0589], // Boston, Massachusetts, USA
    coordinates: latLngToPixel(42.3601, -71.0589),
    title: 'Tìm hiểu phương Tây',
    description: 'Làm việc tại Boston, tự học và quan sát xã hội tư bản',
    type: 'journey'
  },
  {
    id: '1913-england',
    year: '1913-1917',
    location: 'Anh Quốc',
    latLng: [51.5074, -0.1278], // London, United Kingdom
    coordinates: latLngToPixel(51.5074, -0.1278),
    title: 'Làm thuê tự học',
    description: 'Làm việc ở London, tiếp tục tự học và rèn luyện',
    type: 'journey'
  },
  {
    id: '1917-paris',
    year: '1917-1923',
    location: 'Paris, Pháp',
    latLng: [48.8566, 2.3522], // Paris, France
    coordinates: latLngToPixel(48.8566, 2.3522),
    title: 'Nguyễn Ái Quốc ra đời',
    description: 'Hoạt động cách mạng, gửi Bản yêu sách 8 điểm, tham gia thành lập Đảng Cộng sản Pháp',
    type: 'revolutionary'
  },
  {
    id: '1923-moscow',
    year: '1923-1924',
    location: 'Moskva, Nga',
    latLng: [55.7558, 37.6173], // Moscow, Russia
    coordinates: latLngToPixel(55.7558, 37.6173),
    title: 'Học tập chủ nghĩa Mác-Lênin',
    description: 'Làm việc với Quốc tế Cộng sản, dự Đại hội V Comintern',
    type: 'revolutionary'
  },
  {
    id: '1925-guangzhou',
    year: '1925-1927',
    location: 'Quảng Châu, Trung Quốc',
    latLng: [23.1291, 113.2644], // Guangzhou, China
    coordinates: latLngToPixel(23.1291, 113.2644),
    title: 'Thành lập Thanh niên',
    description: 'Sáng lập Hội Việt Nam Cách mạng Thanh niên, biên soạn "Đường Kách mệnh"',
    type: 'revolutionary'
  },
  {
    id: '1930-hongkong',
    year: '1930',
    location: 'Hồng Kông',
    latLng: [22.3193, 114.1694], // Hong Kong
    coordinates: latLngToPixel(22.3193, 114.1694),
    title: 'Thành lập Đảng',
    description: 'Chủ trì Hội nghị hợp nhất, thành lập Đảng Cộng sản Việt Nam',
    type: 'revolutionary'
  },
  {
    id: '1941-pacbo',
    year: '1941',
    location: 'Pác Bó, Cao Bằng',
    latLng: [22.6200, 106.8000], // Pac Bo Cave, Cao Bang, Vietnam (chính xác hơn)
    coordinates: latLngToPixel(22.6200, 106.8000),
    title: 'Trở về Tổ quốc',
    description: 'Sau gần 30 năm bôn ba, trở về Việt Nam trực tiếp lãnh đạo cách mạng',
    type: 'homeland'
  }
];

const JourneyMap: React.FC<JourneyMapProps> = ({ currentStep, onPointClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [animatedPoints, setAnimatedPoints] = useState<Set<string>>(new Set());
  const [showHint, setShowHint] = useState(false);
  const [hintPoint, setHintPoint] = useState<JourneyPoint | null>(null);
  const [showGeneralHint, setShowGeneralHint] = useState(true);
  const [showPointingHint, setShowPointingHint] = useState(false);
  const hintTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const generalHintTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pointingHintTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Create path data for the journey using percentage coordinates
  const createPath = () => {
    const visiblePoints = journeyPoints.slice(0, currentStep + 1);
    if (visiblePoints.length < 2) return '';
    
    const [startX, startY] = visiblePoints[0].coordinates;
    let path = `M ${startX} ${startY}`;
    
    for (let i = 1; i < visiblePoints.length; i++) {
      const [x, y] = visiblePoints[i].coordinates;
      // Add some curve to make the path more interesting
      if (i === visiblePoints.length - 1) {
        path += ` L ${x} ${y}`;
      } else {
        const [prevX, prevY] = visiblePoints[i - 1].coordinates;
        const controlX = (prevX + x) / 2;
        const controlY = Math.min(prevY, y) - 2; // Adjusted for percentage scale
        path += ` Q ${controlX} ${controlY} ${x} ${y}`;
      }
    }
    
    return path;
  };

  useEffect(() => {
    const newAnimatedPoints = new Set<string>();
    for (let i = 0; i <= currentStep && i < journeyPoints.length; i++) {
      newAnimatedPoints.add(journeyPoints[i].id);
    }
    setAnimatedPoints(newAnimatedPoints);

    // Show hint for the current landmark
    if (currentStep >= 0 && currentStep < journeyPoints.length) {
      const currentPoint = journeyPoints[currentStep];
      setHintPoint(currentPoint);
      setShowHint(true);
      setShowPointingHint(true);

      // Clear any existing timeout
      if (hintTimeoutRef.current) {
        clearTimeout(hintTimeoutRef.current);
      }
      if (pointingHintTimeoutRef.current) {
        clearTimeout(pointingHintTimeoutRef.current);
      }

      // Hide hint after 7 seconds
      hintTimeoutRef.current = setTimeout(() => {
        setShowHint(false);
      }, 7000);

      // Hide pointing hint after 8 seconds
      pointingHintTimeoutRef.current = setTimeout(() => {
        setShowPointingHint(false);
      }, 8000);
    }

    // Cleanup timeout on unmount
    return () => {
      if (hintTimeoutRef.current) {
        clearTimeout(hintTimeoutRef.current);
      }
      if (pointingHintTimeoutRef.current) {
        clearTimeout(pointingHintTimeoutRef.current);
      }
    };
  }, [currentStep]);

  // General hint for first-time users
  useEffect(() => {
    // Show general hint for 10 seconds when component mounts
    generalHintTimeoutRef.current = setTimeout(() => {
      setShowGeneralHint(false);
    }, 10000);

    return () => {
      if (generalHintTimeoutRef.current) {
        clearTimeout(generalHintTimeoutRef.current);
      }
    };
  }, []);

  const handlePointClick = (point: JourneyPoint) => {
    // Hide hints when user clicks
    setShowHint(false);
    setShowGeneralHint(false);
    setShowPointingHint(false);
    if (hintTimeoutRef.current) {
      clearTimeout(hintTimeoutRef.current);
    }
    if (generalHintTimeoutRef.current) {
      clearTimeout(generalHintTimeoutRef.current);
    }
    if (pointingHintTimeoutRef.current) {
      clearTimeout(pointingHintTimeoutRef.current);
    }
    // Call the original click handler
    onPointClick(point);
  };

  const getPointClass = (point: JourneyPoint) => {
    const baseClass = "story-point w-4 h-4 rounded-full transition-all duration-500 cursor-pointer relative";
    
    switch (point.type) {
      case 'start':
        return `${baseClass} homeland animate-pulse-glow`;
      case 'revolutionary':
        return `${baseClass} bg-primary`;
      case 'homeland':
        return `${baseClass} homeland animate-pulse-glow`;
      default:
        return `${baseClass} golden`;
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* World map background image */}
      <div className="absolute inset-0">
        <img 
          src={worldMapBackground} 
          alt="World Map" 
          className="w-full h-full object-cover opacity-30"
          style={{ imageRendering: 'auto' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />
      </div>

      {/* Journey path */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full z-10"
        preserveAspectRatio="none"
        style={{ pointerEvents: 'none' }}
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--accent))" />
            <stop offset="50%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </linearGradient>
          <filter id="pathGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <path
          ref={pathRef}
          d={createPath()}
          stroke="url(#pathGradient)"
          strokeWidth="0.8"
          fill="none"
          filter="url(#pathGlow)"
          className="transition-all duration-500 ease-in-out"
          style={{
            strokeDasharray: currentStep > 0 ? 'none' : '10,5',
            strokeDashoffset: currentStep > 0 ? 0 : 100,
            vectorEffect: 'non-scaling-stroke'
          }}
        />
      </svg>

      {/* Journey points */}
      {journeyPoints.map((point, index) => (
        <div
          key={point.id}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 ${
            animatedPoints.has(point.id) ? 'animate-fadeIn scale-100' : 'opacity-0 scale-75'
          }`}
          style={{
            left: `${point.coordinates[0]}%`,
            top: `${point.coordinates[1]}%`,
            animationDelay: `${index * 0.2}s`,
            willChange: 'transform, opacity'
          }}
          onClick={() => handlePointClick(point)}
        >
          <div className={`${getPointClass(point)} ${showHint && hintPoint?.id === point.id ? 'relative' : ''}`}>
            {/* Pulsing ring for hint */}
            {showHint && hintPoint?.id === point.id && (
              <div className="absolute inset-0 animate-ping">
                <div className="w-full h-full bg-primary/40 rounded-full scale-150"></div>
              </div>
            )}
            
            {/* Year label */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-foreground whitespace-nowrap bg-background/80 px-2 py-1 rounded-md">
              {point.year}
            </div>
            
            {/* Location label */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap max-w-32 text-center bg-background/80 px-2 py-1 rounded-md">
              {point.location}
            </div>
            
            {/* Click hint indicator */}
            {showHint && hintPoint?.id === point.id && (
              <div className="absolute -top-2 -right-2 text-xs animate-ping">
                👆
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Character icon (moves along the path) */}
      {currentStep >= 0 && (
        <div
          className="absolute w-10 h-10 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out z-30"
          style={{
            left: `${journeyPoints[Math.min(currentStep, journeyPoints.length - 1)].coordinates[0]}%`,
            top: `${journeyPoints[Math.min(currentStep, journeyPoints.length - 1)].coordinates[1]}%`,
          }}
        >
          <div className="w-full h-full bg-primary rounded-full animate-pulse-glow flex items-center justify-center text-lg font-bold shadow-lg border-2 border-background">
            🇻🇳
          </div>
        </div>
      )}

      {/* Auto-display current point information */}
      {currentStep >= 0 && currentStep < journeyPoints.length && (
        <Card className="absolute bottom-8 left-8 max-w-sm z-40 bg-card/95 backdrop-blur-md border-border shadow-2xl animate-fade-in">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-primary-foreground bg-primary px-2 py-1 rounded-full">
                {journeyPoints[currentStep].year}
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                📍 {journeyPoints[currentStep].location}
              </span>
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">
              {journeyPoints[currentStep].title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {journeyPoints[currentStep].description}
            </p>
            <div className="mt-3 w-full h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${((currentStep + 1) / journeyPoints.length) * 100}%` }}
              />
            </div>
          </div>
        </Card>
      )}

      {/* General User Guidance Hint */}
      {showGeneralHint && (
        <div className="absolute top-8 right-8 z-50 animate-bounce-gentle">
          <div className="bg-accent text-accent-foreground px-4 py-3 rounded-lg shadow-lg border-2 border-accent-foreground/20 max-w-xs">
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="text-xl">💡</span>
              <div>
                <div className="font-bold">Hướng dẫn sử dụng</div>
                <div className="text-xs opacity-90 mt-1">
                  Bấm vào các cột mốc 📍 để xem thông tin chi tiết về hành trình của Bác Hồ!
                </div>
              </div>
            </div>
            <button 
              onClick={() => setShowGeneralHint(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-accent-foreground text-accent rounded-full text-xs flex items-center justify-center hover:bg-accent-foreground/80 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Pointing Finger Hint */}
      {showPointingHint && hintPoint && (
        <div className="absolute top-8 left-8 z-50">
          <div className="bg-primary text-primary-foreground px-4 py-3 rounded-lg shadow-lg border-2 border-primary-foreground/20 animate-bounce-gentle">
            <div className="flex items-center gap-3 text-sm font-medium">
              <div className="text-2xl animate-point-finger">👉</div>
              <div>
                <div className="font-bold whitespace-nowrap">Gợi ý</div>
                <div className="text-xs opacity-90 mt-1">
                  Hãy bấm vào các cột mốc để khám phá chi tiết hành trình của Bác Hồ!
                </div>
              </div>
            </div>
            <button 
              onClick={() => setShowPointingHint(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-primary-foreground text-primary rounded-full text-xs flex items-center justify-center hover:bg-primary-foreground/80 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JourneyMap;
