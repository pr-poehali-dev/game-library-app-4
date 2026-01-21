import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Game {
  id: number;
  title: string;
  price: number;
  platform: string[];
  genre: string;
  image: string;
  rating: number;
  inLibrary?: boolean;
  description: string;
  developer: string;
  releaseDate: string;
  requirements: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
  screenshots: string[];
  reviews: { author: string; rating: number; text: string; date: string }[];
}

const MOCK_GAMES: Game[] = [
  {
    id: 1,
    title: 'Cyberpunk 2077',
    price: 2999,
    platform: ['PC', 'Console'],
    genre: 'RPG',
    image: 'https://cdn.poehali.dev/projects/f99da123-0598-41a0-a66c-c49e1a7e6712/files/c7263523-04b1-44be-bcd9-7bc1eb47fe39.jpg',
    rating: 4.5,
    description: 'Киберпанк 2077 — это приключенческая ролевая игра с открытым миром, действие которой происходит в Найт-Сити, мегаполисе будущего, жители которого одержимы властью, гламуром и модификациями тела.',
    developer: 'CD Projekt Red',
    releaseDate: '10 декабря 2020',
    requirements: {
      os: 'Windows 10',
      processor: 'Intel Core i7-4790 или AMD Ryzen 3 3200G',
      memory: '12 ГБ ОЗУ',
      graphics: 'NVIDIA GeForce GTX 1060 6GB или AMD Radeon R9 Fury',
      storage: '70 ГБ',
    },
    screenshots: [
      'https://cdn.poehali.dev/projects/f99da123-0598-41a0-a66c-c49e1a7e6712/files/c7263523-04b1-44be-bcd9-7bc1eb47fe39.jpg',
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800',
      'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800',
    ],
    reviews: [
      { author: 'Игорь К.', rating: 5, text: 'Невероятная атмосфера и проработка мира! Лучшая RPG 2020 года.', date: '15 янв 2024' },
      { author: 'Мария С.', rating: 4, text: 'Отличный сюжет, но были технические проблемы на старте.', date: '22 дек 2023' },
    ],
  },
  {
    id: 2,
    title: 'Half-Life: Alyx',
    price: 1499,
    platform: ['VR'],
    genre: 'Action',
    image: 'https://cdn.poehali.dev/projects/f99da123-0598-41a0-a66c-c49e1a7e6712/files/97995802-59ec-406a-ac42-604b06635fdb.jpg',
    rating: 5.0,
    description: 'Half-Life: Alyx — флагманская VR-игра от Valve. Возвращение в культовую вселенную Half-Life с полным погружением в виртуальную реальность.',
    developer: 'Valve',
    releaseDate: '23 марта 2020',
    requirements: {
      os: 'Windows 10',
      processor: 'Intel Core i5-7500 / AMD Ryzen 5 1600',
      memory: '12 ГБ ОЗУ',
      graphics: 'GTX 1060 / RX 580 - 6GB VRAM',
      storage: '70 ГБ',
    },
    screenshots: [
      'https://cdn.poehali.dev/projects/f99da123-0598-41a0-a66c-c49e1a7e6712/files/97995802-59ec-406a-ac42-604b06635fdb.jpg',
      'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800',
      'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800',
    ],
    reviews: [
      { author: 'Алексей В.', rating: 5, text: 'Эталон VR-игр! Абсолютный must-have для владельцев VR-шлемов.', date: '10 фев 2024' },
      { author: 'Дмитрий Л.', rating: 5, text: 'Valve снова показали, как нужно делать игры. Шедевр!', date: '05 янв 2024' },
    ],
  },
  {
    id: 3,
    title: 'Beat Saber',
    price: 999,
    platform: ['VR'],
    genre: 'Music',
    image: 'https://cdn.poehali.dev/projects/f99da123-0598-41a0-a66c-c49e1a7e6712/files/701b03f5-904b-42d4-a7e0-5bcd7b7032bd.jpg',
    rating: 4.8,
    description: 'Beat Saber — уникальная ритм-игра для VR, где вы рубите летящие кубики световыми мечами в такт музыке. Идеальное сочетание физической активности и развлечения.',
    developer: 'Beat Games',
    releaseDate: '21 мая 2019',
    requirements: {
      os: 'Windows 7/8.1/10',
      processor: 'Intel Core i5 Sandy Bridge или эквивалент',
      memory: '4 ГБ ОЗУ',
      graphics: 'NVIDIA GTX 960 или эквивалент',
      storage: '200 МБ',
    },
    screenshots: [
      'https://cdn.poehali.dev/projects/f99da123-0598-41a0-a66c-c49e1a7e6712/files/701b03f5-904b-42d4-a7e0-5bcd7b7032bd.jpg',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800',
      'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=800',
    ],
    reviews: [
      { author: 'Екатерина П.', rating: 5, text: 'Лучший способ совместить спорт и игры! Играю каждый день.', date: '18 фев 2024' },
      { author: 'Максим Р.', rating: 5, text: 'Невероятно затягивает! Отличная музыка и геймплей.', date: '12 фев 2024' },
    ],
  },
  {
    id: 4,
    title: 'Call of Duty Mobile',
    price: 0,
    platform: ['Mobile'],
    genre: 'Shooter',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500',
    rating: 4.2,
    description: 'Культовый шутер Call of Duty теперь на мобильных устройствах! Многопользовательские сражения и королевская битва на вашем смартфоне.',
    developer: 'Activision',
    releaseDate: '1 октября 2019',
    requirements: {
      os: 'Android 5.1 / iOS 9.0',
      processor: 'Snapdragon 625 или выше',
      memory: '2 ГБ ОЗУ',
      graphics: 'Adreno 506 или выше',
      storage: '2 ГБ',
    },
    screenshots: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800',
      'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800',
    ],
    reviews: [
      { author: 'Сергей М.', rating: 4, text: 'Отличная мобильная адаптация! Играю в метро каждый день.', date: '25 янв 2024' },
      { author: 'Анна Д.', rating: 4, text: 'Хорошая графика для мобилки, но много микротранзакций.', date: '20 янв 2024' },
    ],
  },
  {
    id: 5,
    title: 'Genshin Impact',
    price: 0,
    platform: ['PC', 'Mobile'],
    genre: 'RPG',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500',
    rating: 4.6,
    description: 'Genshin Impact — бесплатная action-RPG с открытым миром в аниме-стиле. Исследуйте волшебный мир Тейвата и собирайте уникальных персонажей.',
    developer: 'miHoYo',
    releaseDate: '28 сентября 2020',
    requirements: {
      os: 'Windows 7 SP1 64-bit / iOS 9.0 / Android 7.0',
      processor: 'Intel Core i5 / Snapdragon 845',
      memory: '8 ГБ ОЗУ / 3 ГБ (мобильная)',
      graphics: 'NVIDIA GeForce GT 1030',
      storage: '30 ГБ',
    },
    screenshots: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800',
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800',
    ],
    reviews: [
      { author: 'Ольга К.', rating: 5, text: 'Красивейшая графика и интересный сюжет! Затягивает надолго.', date: '08 фев 2024' },
      { author: 'Иван П.', rating: 4, text: 'Отличная игра, но система гача может быть жесткой.', date: '01 фев 2024' },
    ],
  },
  {
    id: 6,
    title: 'Red Dead Redemption 2',
    price: 3499,
    platform: ['PC', 'Console'],
    genre: 'Adventure',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500',
    rating: 4.9,
    description: 'Red Dead Redemption 2 — эпическое приключение на Диком Западе от Rockstar Games. Живой открытый мир с невероятным уровнем детализации.',
    developer: 'Rockstar Games',
    releaseDate: '5 декабря 2019',
    requirements: {
      os: 'Windows 7 SP1 64-bit',
      processor: 'Intel Core i7-4770K / AMD Ryzen 5 1500X',
      memory: '12 ГБ ОЗУ',
      graphics: 'Nvidia GeForce GTX 1060 6GB / AMD Radeon RX 480 4GB',
      storage: '150 ГБ',
    },
    screenshots: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800',
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800',
    ],
    reviews: [
      { author: 'Павел Н.', rating: 5, text: 'Шедевр! Лучшая игра Rockstar. Детализация мира просто фантастическая.', date: '14 фев 2024' },
      { author: 'Елена Г.', rating: 5, text: 'Невероятная атмосфера Дикого Запада. Эмоциональный сюжет.', date: '09 фев 2024' },
    ],
  },
  {
    id: 7,
    title: 'Among Us',
    price: 199,
    platform: ['Mobile', 'PC'],
    genre: 'Casual',
    image: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=500',
    rating: 4.1,
    description: 'Among Us — многопользовательская игра на социальную дедукцию. Работайте в команде, чтобы выжить на космическом корабле, но остерегайтесь предателей!',
    developer: 'Innersloth',
    releaseDate: '15 июня 2018',
    requirements: {
      os: 'Windows 7 SP1+ / iOS 10.0 / Android 4.4',
      processor: 'SSE2 instruction set support',
      memory: '1 ГБ ОЗУ',
      graphics: 'Intel HD Graphics',
      storage: '250 МБ',
    },
    screenshots: [
      'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800',
    ],
    reviews: [
      { author: 'Никита А.', rating: 4, text: 'Отличная игра для компании друзей! Много смеха и напряжения.', date: '30 янв 2024' },
      { author: 'София Б.', rating: 4, text: 'Простая, но затягивающая. Играем всей семьей.', date: '28 янв 2024' },
    ],
  },
  {
    id: 8,
    title: 'Minecraft',
    price: 799,
    platform: ['PC', 'Mobile', 'Console'],
    genre: 'Sandbox',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500',
    rating: 4.7,
    description: 'Minecraft — культовая песочница, где вы можете строить что угодно из блоков. Исследуйте бесконечный мир, выживайте и воплощайте свои идеи в жизнь.',
    developer: 'Mojang Studios',
    releaseDate: '18 ноября 2011',
    requirements: {
      os: 'Windows 7 / iOS 8.0 / Android 5.0',
      processor: 'Intel Core i3-3210 / AMD A8-7600',
      memory: '4 ГБ ОЗУ',
      graphics: 'Intel HD Graphics 4000 / AMD Radeon R5',
      storage: '1 ГБ',
    },
    screenshots: [
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800',
    ],
    reviews: [
      { author: 'Артём З.', rating: 5, text: 'Легенда! Играю уже 10 лет и не надоедает.', date: '16 фев 2024' },
      { author: 'Виктория Х.', rating: 5, text: 'Лучшая игра для творчества. Дети в восторге!', date: '11 фев 2024' },
    ],
  },
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [library, setLibrary] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('store');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const filteredGames = MOCK_GAMES.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = selectedPlatform === 'all' || game.platform.some(p => p.toLowerCase().includes(selectedPlatform.toLowerCase()));
    const matchesGenre = selectedGenre === 'all' || game.genre === selectedGenre;
    return matchesSearch && matchesPlatform && matchesGenre;
  });

  const libraryGames = MOCK_GAMES.filter((game) => library.includes(game.id));

  const toggleLibrary = (gameId: number) => {
    setLibrary((prev) =>
      prev.includes(gameId) ? prev.filter((id) => id !== gameId) : [...prev, gameId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Icon name="Gamepad2" size={28} className="text-primary" />
                GameHub
              </h1>
              <nav className="hidden md:flex gap-6">
                <button
                  onClick={() => setActiveTab('store')}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === 'store' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Магазин
                </button>
                <button
                  onClick={() => setActiveTab('library')}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === 'library' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Библиотека
                </button>
                <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Поддержка
                </button>
              </nav>
            </div>
            {!isLoggedIn ? (
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => setIsLoggedIn(true)}>Войти</Button>
                <Button onClick={() => setIsLoggedIn(true)}>Регистрация</Button>
              </div>
            ) : (
              <Button variant="ghost" className="flex items-center gap-2">
                <Icon name="User" size={20} />
                Профиль
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'store' && (
          <>
            <section className="mb-12 rounded-lg bg-gradient-to-r from-primary/20 to-purple-600/20 p-8 md:p-12">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Добро пожаловать в GameHub
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Откройте для себя тысячи игр для PC, консолей, мобильных устройств и VR
                </p>
                <Button size="lg" className="gap-2">
                  <Icon name="Search" size={20} />
                  Начать поиск
                </Button>
              </div>
            </section>

            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Поиск игр..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Платформа" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все платформы</SelectItem>
                    <SelectItem value="pc">PC</SelectItem>
                    <SelectItem value="console">Консоли</SelectItem>
                    <SelectItem value="mobile">Мобильные</SelectItem>
                    <SelectItem value="vr">VR</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Жанр" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все жанры</SelectItem>
                    <SelectItem value="Action">Action</SelectItem>
                    <SelectItem value="RPG">RPG</SelectItem>
                    <SelectItem value="Shooter">Shooter</SelectItem>
                    <SelectItem value="Adventure">Adventure</SelectItem>
                    <SelectItem value="Sandbox">Sandbox</SelectItem>
                    <SelectItem value="Music">Music</SelectItem>
                    <SelectItem value="Casual">Casual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  Найдено игр: {filteredGames.length}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map((game) => (
                <Card
                  key={game.id}
                  className="overflow-hidden group hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => setSelectedGame(game)}
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 truncate">{game.title}</h3>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {game.platform.map((p) => (
                        <Badge key={p} variant="secondary" className="text-xs">
                          {p}
                        </Badge>
                      ))}
                      <Badge variant="outline" className="text-xs">
                        {game.genre}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{game.rating}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">
                        {game.price === 0 ? 'Бесплатно' : `${game.price} ₽`}
                      </span>
                      <Button
                        size="sm"
                        variant={library.includes(game.id) ? 'outline' : 'default'}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLibrary(game.id);
                        }}
                        className="gap-1"
                      >
                        {library.includes(game.id) ? (
                          <>
                            <Icon name="Check" size={16} />
                            В библиотеке
                          </>
                        ) : (
                          <>
                            <Icon name="Plus" size={16} />
                            Добавить
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        {activeTab === 'library' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Моя библиотека</h2>
              <p className="text-muted-foreground">
                {libraryGames.length === 0
                  ? 'Ваша библиотека пуста. Добавьте игры из магазина!'
                  : `Игр в библиотеке: ${libraryGames.length}`}
              </p>
            </div>

            {libraryGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {libraryGames.map((game) => (
                  <Card
                    key={game.id}
                    className="overflow-hidden group hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={game.image}
                        alt={game.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 truncate">{game.title}</h3>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {game.platform.map((p) => (
                          <Badge key={p} variant="secondary" className="text-xs">
                            {p}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1 gap-1">
                          <Icon name="Play" size={16} />
                          Играть
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => toggleLibrary(game.id)}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Icon name="Library" size={64} className="text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Библиотека пуста</h3>
                <p className="text-muted-foreground mb-4">
                  Перейдите в магазин и добавьте игры в свою коллекцию
                </p>
                <Button onClick={() => setActiveTab('store')}>
                  Перейти в магазин
                </Button>
              </div>
            )}
          </div>
        )}
      </main>

      <Dialog open={!!selectedGame} onOpenChange={() => setSelectedGame(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedGame && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedGame.title}</DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <div className="aspect-video w-full overflow-hidden rounded-lg">
                  <img
                    src={selectedGame.image}
                    alt={selectedGame.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Icon name="Star" size={20} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-lg font-semibold">{selectedGame.rating}</span>
                  </div>
                  {selectedGame.platform.map((p) => (
                    <Badge key={p} variant="secondary">{p}</Badge>
                  ))}
                  <Badge variant="outline">{selectedGame.genre}</Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-primary">
                      {selectedGame.price === 0 ? 'Бесплатно' : `${selectedGame.price} ₽`}
                    </span>
                    <Button
                      size="lg"
                      variant={library.includes(selectedGame.id) ? 'outline' : 'default'}
                      onClick={() => toggleLibrary(selectedGame.id)}
                      className="gap-2"
                    >
                      {library.includes(selectedGame.id) ? (
                        <>
                          <Icon name="Check" size={20} />
                          В библиотеке
                        </>
                      ) : (
                        <>
                          <Icon name="ShoppingCart" size={20} />
                          Добавить в библиотеку
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <Tabs defaultValue="about" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="about">Описание</TabsTrigger>
                    <TabsTrigger value="requirements">Требования</TabsTrigger>
                    <TabsTrigger value="reviews">Отзывы</TabsTrigger>
                  </TabsList>

                  <TabsContent value="about" className="space-y-4 mt-4">
                    <div>
                      <h3 className="font-semibold mb-2">О игре</h3>
                      <p className="text-muted-foreground leading-relaxed">{selectedGame.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Разработчик</p>
                        <p className="font-medium">{selectedGame.developer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Дата выхода</p>
                        <p className="font-medium">{selectedGame.releaseDate}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Скриншоты</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {selectedGame.screenshots.map((screenshot, idx) => (
                          <div key={idx} className="aspect-video overflow-hidden rounded-md">
                            <img
                              src={screenshot}
                              alt={`Screenshot ${idx + 1}`}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="requirements" className="space-y-4 mt-4">
                    <div>
                      <h3 className="font-semibold mb-3">Системные требования</h3>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Icon name="MonitorSmartphone" size={20} className="text-primary flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground">Операционная система</p>
                            <p className="font-medium">{selectedGame.requirements.os}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Icon name="Cpu" size={20} className="text-primary flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground">Процессор</p>
                            <p className="font-medium">{selectedGame.requirements.processor}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Icon name="MemoryStick" size={20} className="text-primary flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground">Оперативная память</p>
                            <p className="font-medium">{selectedGame.requirements.memory}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Icon name="Zap" size={20} className="text-primary flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground">Видеокарта</p>
                            <p className="font-medium">{selectedGame.requirements.graphics}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Icon name="HardDrive" size={20} className="text-primary flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground">Место на диске</p>
                            <p className="font-medium">{selectedGame.requirements.storage}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews" className="space-y-4 mt-4">
                    <div>
                      <h3 className="font-semibold mb-3">Отзывы игроков</h3>
                      <div className="space-y-4">
                        {selectedGame.reviews.map((review, idx) => (
                          <Card key={idx} className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                  <Icon name="User" size={16} />
                                </div>
                                <div>
                                  <p className="font-medium">{review.author}</p>
                                  <p className="text-xs text-muted-foreground">{review.date}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                                <span className="text-sm font-medium">{review.rating}</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{review.text}</p>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Icon name="Gamepad2" size={20} className="text-primary" />
                GameHub
              </h3>
              <p className="text-sm text-muted-foreground">
                Ваша универсальная платформа для игр на всех устройствах
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Платформы</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>PC игры</li>
                <li>Консольные игры</li>
                <li>Мобильные игры</li>
                <li>VR игры</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Справка</li>
                <li>Контакты</li>
                <li>FAQ</li>
                <li>Возврат средств</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Сообщество</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Форум</li>
                <li>Discord</li>
                <li>Twitter</li>
                <li>YouTube</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 GameHub. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}