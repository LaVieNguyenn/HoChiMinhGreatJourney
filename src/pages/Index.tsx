import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import JourneyMap, { journeyPoints, JourneyPoint as JourneyPointData } from '@/components/JourneyMap';
import Timeline, { timelineEvents, TimelineEvent } from '@/components/Timeline';
import JourneyDetail from '@/components/JourneyDetail';
import JourneyOverview from '@/components/JourneyOverview';
import QuizDialog from '@/components/QuizDialog';
import { ThemeToggle } from '@/components/ThemeToggle';
import { VietnamFlag } from '@/components/VietnamFlag';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { BookOpen, Pause, Play, Minus, Plus, Volume2, VolumeX } from 'lucide-react';
import storytellingBgm from '@/assets/background.mp3';
import hoChiMinhPortrait from '@/assets/ho-chi-minh.jpeg';
import partyFounding from '@/assets/party-founding.jpg';
import heroBacHoJourney from '@/assets/BacHoDiTimDuongCuuNuoc.jpg';
import heroBacHoNhaRong from '@/assets/BacHoTuBenNhaRong.jpg';

interface StoryControlsProps {
  isEnabled: boolean;
  isPlaying: boolean;
  onToggleEnabled: (checked: boolean) => void;
  onTogglePlay: () => void;
  onRateIncrease: () => void;
  onRateDecrease: () => void;
  rate: number;
  stepIndex: number;
  totalSteps: number;
  disabled?: boolean;
  isMusicEnabled: boolean;
  onToggleMusic: () => void;
}

const StoryControls: React.FC<StoryControlsProps> = ({
  isEnabled,
  isPlaying,
  onToggleEnabled,
  onTogglePlay,
  onRateIncrease,
  onRateDecrease,
  rate,
  stepIndex,
  totalSteps,
  disabled,
  isMusicEnabled,
  onToggleMusic,
}) => {
  return (
    <Card className="w-72 border border-border/70 bg-card/95 p-5 shadow-xl backdrop-blur">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-foreground">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">Chế độ kể chuyện</span>
          </div>
        </div>
        <Switch checked={isEnabled} onCheckedChange={onToggleEnabled} disabled={disabled} />
      </div>

      <div
        className={`mt-4 space-y-4 transition-opacity ${
          isEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Giai đoạn hiện tại</span>
          <span className="font-medium text-foreground">
            {stepIndex + 1}/{totalSteps}
          </span>
        </div>

        <Button
          onClick={onTogglePlay}
          size="sm"
          className="w-full flex items-center justify-center gap-2"
          disabled={disabled}
        >
          {isPlaying ? (
            <>
              <Pause className="h-4 w-4" />
              <span>Tạm dừng đọc</span>
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              <span>Bắt đầu đọc</span>
            </>
          )}
        </Button>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Tốc độ</span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={onRateDecrease}
              disabled={disabled || !isEnabled}
              className="h-8 w-8"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-sm font-semibold text-foreground">
              {rate.toFixed(1)}x
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={onRateIncrease}
              disabled={disabled || !isEnabled}
              className="h-8 w-8"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Nhạc nền</span>
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleMusic}
            disabled={disabled || !isEnabled}
            className="flex items-center gap-2"
          >
            {isMusicEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            <span className="text-xs font-medium">
              {isMusicEnabled ? 'Đang bật' : 'Đang tắt'}
            </span>
          </Button>
        </div>
      </div>

      {disabled && (
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Trình duyệt hiện chưa hỗ trợ Speech Synthesis, hãy thử Safari hoặc Chrome phiên bản mới nhất.
        </p>
      )}
    </Card>
  );
};

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPoint, setSelectedPoint] = useState<JourneyPointData | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isStoryEnabled, setIsStoryEnabled] = useState(false);
  const [isStoryPlaying, setIsStoryPlaying] = useState(false);
  const [storyRate, setStoryRate] = useState(0.85);
  const [storyStepIndex, setStoryStepIndex] = useState(0);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);

  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const storyAdvanceRef = useRef(false);
  const releaseTimeoutRef = useRef<number | null>(null);
  const scrollTimeoutRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const totalSteps = timelineEvents.length;

  const journeyPointMap = useMemo(() => {
    const map = new Map<string, JourneyPointData>();
    journeyPoints.forEach((point) => map.set(point.id, point));
    return map;
  }, []);

  const preferredVoice = useMemo(() => {
    if (!availableVoices.length) return null;

    const scoreVoice = (voice: SpeechSynthesisVoice) => {
      const lang = voice.lang?.toLowerCase() ?? '';
      const name = voice.name?.toLowerCase() ?? '';
      let score = 0;

      if (lang.startsWith('vi')) score += 100;
      if (lang === 'vi-vn') score += 20;

      if (/male|nam|anh|binh|bao|deep|south|trong|thanh|man/i.test(name)) score += 25;
      if (/female|nu|mien bac|north/i.test(name)) score -= 15;

      if (/google/i.test(name)) score += 5;
      if (!lang.startsWith('vi')) score -= 120;

      return score;
    };

    const sortedVoices = [...availableVoices].sort((a, b) => scoreVoice(b) - scoreVoice(a));
    const bestVietnamese = sortedVoices.find((voice) => voice.lang?.toLowerCase().startsWith('vi'));
    return bestVietnamese ?? sortedVoices[0] ?? null;
  }, [availableVoices]);

  const clampStep = useCallback(
    (step: number) => Math.min(totalSteps - 1, Math.max(0, step)),
    [totalSteps]
  );

  useEffect(() => {
    const audio = new Audio(storytellingBgm);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const stopSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    speechRef.current = null;
  }, []);

  const playBackgroundMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
    } catch (error) {
      // Autoplay might be blocked until the user interacts; ignore errors silently.
    }
  }, []);

  const pauseBackgroundMusic = useCallback((reset = false) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    if (reset) {
      audio.currentTime = 0;
    }
  }, []);

  const disableStory = useCallback(() => {
    stopSpeech();
    setIsStoryPlaying(false);
    setIsStoryEnabled(false);
    storyAdvanceRef.current = false;
    if (releaseTimeoutRef.current) {
      window.clearTimeout(releaseTimeoutRef.current);
      releaseTimeoutRef.current = null;
    }
    pauseBackgroundMusic(true);
  }, [pauseBackgroundMusic, stopSpeech]);

  const handleStoryEnabledChange = useCallback(
    (checked: boolean) => {
      if (!checked) {
        disableStory();
        return;
      }

      if (!speechSupported) return;

      setIsStoryEnabled(true);
      setStoryStepIndex(clampStep(currentStep));
      setIsStoryPlaying(true);
    },
    [clampStep, currentStep, disableStory, speechSupported]
  );

  const handleStoryPlayPause = useCallback(() => {
    if (!speechSupported) return;

    if (!isStoryEnabled) {
      setIsStoryEnabled(true);
      setStoryStepIndex(clampStep(currentStep));
      setIsStoryPlaying(true);
      return;
    }

    if (isStoryPlaying) {
      stopSpeech();
      setIsStoryPlaying(false);
      return;
    }

    setStoryStepIndex(clampStep(currentStep));
    setIsStoryPlaying(true);
  }, [clampStep, currentStep, isStoryEnabled, isStoryPlaying, speechSupported, stopSpeech]);

  const handleRateIncrease = useCallback(() => {
    setStoryRate((prev) => {
      const next = Math.min(1.4, Number((prev + 0.1).toFixed(1)));
      return next;
    });
  }, []);

  const handleRateDecrease = useCallback(() => {
    setStoryRate((prev) => {
      const next = Math.max(0.7, Number((prev - 0.1).toFixed(1)));
      return next;
    });
  }, []);

  const handleMusicToggle = useCallback(() => {
    setIsMusicEnabled((prev) => {
      const next = !prev;
      if (next) {
        if (isStoryEnabled && isStoryPlaying) {
          playBackgroundMusic();
        }
      } else {
        pauseBackgroundMusic(false);
      }
      return next;
    });
  }, [isStoryEnabled, isStoryPlaying, pauseBackgroundMusic, playBackgroundMusic]);

  const handleStepChange = useCallback((step: number) => {
    setIsScrolling(true);
    setCurrentStep(step);

    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = window.setTimeout(() => {
      setIsScrolling(false);
      scrollTimeoutRef.current = null;
    }, 1000);
  }, []);

  const playNarration = useCallback(() => {
    if (!speechSupported) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const event = timelineEvents[storyStepIndex];
    if (!event) {
      disableStory();
      return;
    }

    window.speechSynthesis.cancel();

    const narrationParts = [event.title, event.description, ...event.details]
      .map((part) => part?.trim())
      .filter(Boolean) as string[];

    if (!narrationParts.length) {
      const nextIndex = storyStepIndex + 1;
      if (nextIndex >= timelineEvents.length) {
        disableStory();
        return;
      }
      setStoryStepIndex(nextIndex);
      return;
    }

    const sentences = narrationParts.map((part) => (/[.!?]$/.test(part) ? part : `${part}.`));
    const narrationText = sentences.join('\n\n');

    const point = journeyPointMap.get(event.id) ?? null;
    setSelectedPoint(point);

    storyAdvanceRef.current = true;
    handleStepChange(storyStepIndex);

    if (releaseTimeoutRef.current) {
      window.clearTimeout(releaseTimeoutRef.current);
    }

    releaseTimeoutRef.current = window.setTimeout(() => {
      storyAdvanceRef.current = false;
      releaseTimeoutRef.current = null;
    }, 1200);

    const utterance = new SpeechSynthesisUtterance(narrationText);
    utterance.lang = preferredVoice?.lang ?? 'vi-VN';
    utterance.volume = 1;
    utterance.rate = storyRate;
    utterance.pitch = 0.85;

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      speechRef.current = null;
      if (!isStoryEnabled) return;

      const nextIndex = storyStepIndex + 1;
      if (nextIndex >= timelineEvents.length) {
        disableStory();
        return;
      }

      setStoryStepIndex(nextIndex);
    };

    utterance.onerror = () => {
      speechRef.current = null;
      if (!isStoryEnabled) return;

      const nextIndex = storyStepIndex + 1;
      if (nextIndex >= timelineEvents.length) {
        disableStory();
        return;
      }

      setStoryStepIndex(nextIndex);
    };

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [
    disableStory,
    handleStepChange,
    isStoryEnabled,
    journeyPointMap,
    preferredVoice,
    speechSupported,
    storyRate,
    storyStepIndex,
    timelineEvents,
  ]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSpeechSupported(false);
      return;
    }

    setSpeechSupported(true);
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      setAvailableVoices(synth.getVoices());
    };

    loadVoices();
    synth.addEventListener('voiceschanged', loadVoices);

    return () => {
      synth.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  useEffect(() => {
    if (!isStoryEnabled) {
      stopSpeech();
      setIsStoryPlaying(false);
    }
  }, [isStoryEnabled, stopSpeech]);

  useEffect(() => {
    const shouldReset = !isStoryEnabled || !isStoryPlaying;
    if (isStoryEnabled && isStoryPlaying && isMusicEnabled) {
      playBackgroundMusic();
    } else {
      pauseBackgroundMusic(shouldReset);
    }
  }, [isStoryEnabled, isStoryPlaying, isMusicEnabled, pauseBackgroundMusic, playBackgroundMusic]);

  useEffect(() => {
    if (!isStoryPlaying) {
      stopSpeech();
    }
  }, [isStoryPlaying, stopSpeech]);

  useEffect(() => {
    if (!isStoryEnabled || !isStoryPlaying) return;

    playNarration();

    return () => {
      if (speechRef.current) {
        speechRef.current.onend = null;
        speechRef.current.onerror = null;
      }
    };
  }, [isStoryEnabled, isStoryPlaying, playNarration]);

  useEffect(() => {
    if (!isStoryEnabled || !isStoryPlaying) return;
    if (storyAdvanceRef.current) return;

    if (currentStep !== storyStepIndex && currentStep < totalSteps) {
      setStoryStepIndex(clampStep(currentStep));
    }
  }, [clampStep, currentStep, isStoryEnabled, isStoryPlaying, storyStepIndex, totalSteps]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      if (releaseTimeoutRef.current) {
        window.clearTimeout(releaseTimeoutRef.current);
      }
      stopSpeech();
      pauseBackgroundMusic(true);
    };
  }, [pauseBackgroundMusic, stopSpeech]);

  // Auto-advance through timeline on scroll with smooth throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking && !isScrolling) {
        requestAnimationFrame(() => {
          const mapSection = document.getElementById('map-section');
          if (!mapSection) return;
          
          const mapRect = mapSection.getBoundingClientRect();
          const mapHeight = mapSection.offsetHeight;
          const viewportHeight = window.innerHeight;
          
          // Calculate scroll progress within the map section
          if (mapRect.top <= 0 && mapRect.bottom >= viewportHeight) {
            const scrollProgress = Math.min(
              Math.max((-mapRect.top) / (mapHeight - viewportHeight), 0),
              1
            );
            
            // Map scroll progress to timeline steps (0-13) with smooth transitions
            const newStep = Math.min(Math.floor(scrollProgress * 14), 13);
            if (newStep !== currentStep) {
              setCurrentStep(newStep);
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolling, currentStep]);

  const handlePointClick = useCallback(
    (point: JourneyPointData) => {
      setSelectedPoint(point);

      const index = timelineEvents.findIndex((event) => event.id === point.id);
      if (index !== -1) {
        handleStepChange(index);
        if (isStoryEnabled) {
          setStoryStepIndex(clampStep(index));
        }
      }
    },
    [clampStep, handleStepChange, isStoryEnabled, timelineEvents]
  );

  const handleTimelineSelect = useCallback(
    (eventData: TimelineEvent, index: number) => {
      const point = journeyPointMap.get(eventData.id) ?? null;
      setSelectedPoint(point);

      if (isStoryPlaying) {
        setIsStoryPlaying(false);
        stopSpeech();
        pauseBackgroundMusic(false);
      }

      if (isStoryEnabled) {
        setStoryStepIndex(clampStep(index));
      }
    },
    [clampStep, isStoryEnabled, isStoryPlaying, journeyPointMap, pauseBackgroundMusic, stopSpeech]
  );

  const handleCloseDetail = () => {
    setSelectedPoint(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* QR code quick access */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-center gap-2 rounded-xl border border-border bg-card/90 p-4 shadow-lg backdrop-blur">
        <a
          href="https://hcm202-fptu-asg.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium text-muted-foreground">
            Quét mã để mở trang web
          </span>
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https%3A%2F%2Fhcm202-fptu-asg.netlify.app%2F"
            alt="QR code dẫn đến trang web hành trình Hồ Chí Minh."
            className="h-32 w-32"
          />
        </a>
      </div>

      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden py-12 sm:py-20">
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />

        <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-30">
          <VietnamFlag size="lg" className="animate-fade-in" />
        </div>

        <div className="relative z-20 w-full px-6">
          <div className="mx-auto flex max-w-5xl flex-col gap-10 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-2xl space-y-6 text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-2 text-xs sm:text-sm font-semibold text-primary shadow-sm shadow-primary/30">
                1911 → 1941 • 5 châu lục • 30 dấu mốc
              </span>
              <h1 className="hero-title drop-shadow-sm text-left text-5xl sm:text-6xl">
                Hành Trình Tìm Đường Cứu Nước
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                Theo dấu Chủ tịch Hồ Chí Minh suốt 30 năm bôn ba – từ Bến Nhà Rồng băng qua Á, Âu, Mỹ, cho tới ngày trở lại Pác Bó lãnh đạo dân tộc giành độc lập.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                <Button size="lg" className="w-full sm:w-auto px-8 font-semibold shadow-lg shadow-primary/40">
                  Bắt đầu khám phá
                </Button>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex -space-x-3">
                    <div className="h-9 w-9 rounded-full border border-background/70 bg-card/80 flex items-center justify-center font-semibold">30</div>
                    <div className="h-9 w-9 rounded-full border border-background/70 bg-card/80 flex items-center justify-center font-semibold">5</div>
                    <div className="h-9 w-9 rounded-full border border-background/70 bg-card/80 flex items-center justify-center font-semibold">1</div>
                  </div>
                  <div className="space-y-1">
                    <p>30 câu chuyện • 5 châu lục • 1 niềm tin tất thắng</p>
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-primary/70">Tương tác • Trực quan • Đa phương tiện</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full xl:w-80 space-y-4">
              <div className="relative overflow-hidden rounded-2xl border border-border/40 shadow-xl shadow-primary/20 bg-card/70 backdrop-blur">
                <img
                  src={heroBacHoNhaRong}
                  alt="Bác Hồ bên Bến Nhà Rồng"
                  className="h-48 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-white/70">Sài Gòn • 05/06/1911</p>
                  <p className="text-lg font-semibold leading-tight">Bác Hồ rời Bến Nhà Rồng lên đường cứu nước</p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-border/40 shadow-xl shadow-secondary/20 bg-card/70 backdrop-blur">
                <img
                  src={heroBacHoJourney}
                  alt="Bác Hồ trong hành trình tìm đường cứu nước"
                  className="h-48 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-white/70">1911 → 1941</p>
                  <p className="text-lg font-semibold leading-tight">Ba mươi năm bôn ba khắp 5 châu lục tìm ánh sáng tự do</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-14 right-10 w-36 sm:w-40 md:w-44 aspect-square overflow-hidden rounded-2xl shadow-lg border border-border/40">
            <img
              src={hoChiMinhPortrait}
              alt="Chủ tịch Hồ Chí Minh"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-20 left-10 w-40 h-32 overflow-hidden rounded-2xl shadow-lg border border-border/40" style={{ animationDelay: '0.8s' }}>
            <img
              src={partyFounding}
              alt="Thành lập Đảng Cộng sản Việt Nam"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-3">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Cuộn xuống để bắt đầu hành trình lịch sử
          </p>
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center bg-background/40">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section id="map-section" className="relative">
        <div className="pointer-events-none absolute right-6 top-6 z-30 max-w-xs">
          <div className="pointer-events-auto">
            <StoryControls
              isEnabled={isStoryEnabled}
              isPlaying={isStoryPlaying}
              onToggleEnabled={handleStoryEnabledChange}
              onTogglePlay={handleStoryPlayPause}
              onRateIncrease={handleRateIncrease}
              onRateDecrease={handleRateDecrease}
              rate={storyRate}
              stepIndex={storyStepIndex}
              totalSteps={totalSteps}
              disabled={!speechSupported}
              isMusicEnabled={isMusicEnabled}
              onToggleMusic={handleMusicToggle}
            />
          </div>
        </div>
        <div className="sticky top-0 h-screen">
          <JourneyMap 
            currentStep={currentStep} 
            onPointClick={handlePointClick}
          />
        </div>
        
        {/* Spacer for scroll-based animation */}
        <div className="h-[500vh]" />
      </section>

      {/* Timeline Section */}
      <section id="timeline-section" className="py-20 bg-gradient-to-b from-card to-background">
        <Timeline 
          currentStep={currentStep}
          onStepChange={handleStepChange}
          onStepSelect={handleTimelineSelect}
        />
      </section>

      {/* Journey Overview Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <JourneyOverview />
        </div>
      </section>

      {/* Summary Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Ý Nghĩa Lịch Sử
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="timeline-card text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-accent to-accent-glow rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                🌍
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Tầm Nhìn Toàn Cầu</h3>
              <p className="text-muted-foreground leading-relaxed">
                30 năm bôn ba khắp 5 châu lục, tích lũy kinh nghiệm và hiểu biết sâu sắc về thế giới
              </p>
            </div>
            
            <div className="timeline-card text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                🔥
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Tư Tưởng Cách Mạng</h3>
              <p className="text-muted-foreground leading-relaxed">
                Kết hợp chủ nghĩa yêu nước với chủ nghĩa quốc tế, hình thành đường lối cách mạng đúng đắn
              </p>
            </div>
            
            <div className="timeline-card text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-secondary to-secondary-glow rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                ⭐
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Thành Tựu Lịch Sử</h3>
              <p className="text-muted-foreground leading-relaxed">
                Thành lập Đảng Cộng sản Việt Nam, mở ra kỷ nguyên mới cho dân tộc Việt Nam
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card/70 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Mình làm tí trắc nghiệm nhoa</h2>
          <p className="text-muted-foreground">
            Kiểm tra kiến thức của bạn về hành trình 30 năm tìm đường cứu nước với 30 câu hỏi trắc nghiệm và điền từ.
            Bạn có 30 phút để hoàn thành và có thể xem đáp án bất cứ lúc nào.
          </p>
          <div className="flex justify-center">
            <QuizDialog
              trigger={
                <Button size="lg" className="px-10 font-semibold">
                  Bắt đầu thoi
                </Button>
              }
            />
          </div>
        </div>
      </footer>

      {/* Journey Detail Modal */}
      <JourneyDetail 
        point={selectedPoint}
        onClose={handleCloseDetail}
      />
    </div>
  );
};

export default Index;
