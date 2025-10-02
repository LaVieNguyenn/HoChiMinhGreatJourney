import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const JourneyOverview = () => {
  const journeyStats = [
    { label: 'Số năm đi tìm đường', value: '30 năm', detail: '1911-1941', icon: '📅' },
    { label: 'Số châu lục đã đến', value: '4 châu lục', detail: 'Á, Âu, Phi, Mỹ', icon: '🌍' },
    { label: 'Số quốc gia', value: '15+ quốc gia', detail: 'Khắp thế giới', icon: '🗺️' },
    { label: 'Thành tựu lớn nhất', value: 'Thành lập Đảng', detail: '3/2/1930', icon: '⭐' }
  ];

  const keyAchievements = [
    {
      year: '1919',
      title: 'Bản yêu sách 8 điểm',
      description: 'Đến Hội nghị Versailles đòi quyền tự do cho dân tộc',
      icon: '📋'
    },
    {
      year: '1920',
      title: 'Tham gia thành lập Đảng CS Pháp',
      description: 'Tại Đại hội Tours, chọn con đường cộng sản',
      icon: '🚩'
    },
    {
      year: '1925',
      title: 'Thành lập Thanh niên',
      description: 'Việt Nam Thanh niên Cách mạng Đồng chí Hội tại Quảng Châu',
      icon: '👥'
    },
    {
      year: '1930',
      title: 'Thành lập Đảng Cộng sản VN',
      description: 'Hội nghị hợp nhất tại Hồng Kông',
      icon: '🎯'
    }
  ];

  const journeyPhases = [
    {
      title: 'Giai đoạn 1 (1911-1917)',
      subtitle: 'Tìm hiểu thế giới',
      description: 'Làm thuê sinh sống, quan sát và học hỏi về thế giới bên ngoài',
      color: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800'
    },
    {
      title: 'Giai đoạn 2 (1917-1930)',
      subtitle: 'Hoạt động cách mạng',
      description: 'Học tập lý luận, hoạt động chính trị và tổ chức cách mạng',
      color: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
    },
    {
      title: 'Giai đoạn 3 (1930-1941)',
      subtitle: 'Chuẩn bị tổng khởi nghĩa',
      description: 'Thành lập Đảng, chuẩn bị các điều kiện cho cách mạng Việt Nam',
      color: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'
    }
  ];

  return (
    <div className="space-y-8 py-12">
      {/* Journey Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {journeyStats.map((stat, index) => (
          <Card key={index} className="text-center hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                {stat.label}
              </div>
              <Badge variant="outline" className="text-xs">
                {stat.detail}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Overview Card */}
      <Card className="border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="text-2xl text-red-800 dark:text-red-200 flex items-center gap-2">
            🌍 Chi Tiết Hành Trình 1911-1941
          </CardTitle>
          <CardDescription className="text-base">
            Tìm hiểu chi tiết về 30 năm đi tìm đường cứu nước của Chủ tịch Hồ Chí Minh
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Journey Phases */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-red-700 dark:text-red-300">
              Các giai đoạn hành trình
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {journeyPhases.map((phase, index) => (
                <Card key={index} className={`${phase.color} border`}>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-lg mb-1">{phase.title}</h4>
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      {phase.subtitle}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {phase.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Key Achievements */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-red-700 dark:text-red-300">
              Thành tựu quan trọng
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {keyAchievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-red-800 dark:text-red-200 flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {achievement.year}
                        </Badge>
                        {achievement.title}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {achievement.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Historical Context */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-red-700 dark:text-red-300">
              Độc Lập - Tự Do - Hạnh Phúc
            </h3>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                Từ năm 1911 đến 1941, Chủ tịch Hồ Chí Minh đã có 30 năm đi tìm đường cứu nước,
                đi qua 4 châu lục (Á, Âu, Phi, Mỹ), hơn 15 quốc gia, từ phụ bếp trên tàu thủy đến nhà cách mạng
                kiệt xuất. Đây là hành trình học hỏi, tích lũy kinh nghiệm và tìm ra con đường
                giải phóng dân tộc đúng đắn.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Cảm ơn Bác và các chiến sĩ:
                  </h4>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Đã hy sinh tuổi trẻ để tìm đường cứu nước</li>
                    <li>• Đã mang lại độc lập cho dân tộc Việt Nam</li>
                    <li>• Đã xây dựng nền tảng cho sự phát triển của đất nước</li>
                    <li>• Đã để lại di sản tinh thần vô giá cho hậu thế</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Việt Nam hôm nay:
                  </h4>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Một đất nước độc lập, tự chủ và phát triển</li>
                    <li>• Nhân dân được sống trong tự do và hạnh phúc</li>
                    <li>• Tiếp tục con đường đổi mới và hội nhập quốc tế</li>
                    <li>• Gìn giữ và phát huy truyền thống yêu nước</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JourneyOverview;