import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
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
}

const MOCK_GAMES: Game[] = [
  { id: 1, title: 'Cyberpunk 2077', price: 2999, platform: ['PC', 'Console'], genre: 'RPG', image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500', rating: 4.5 },
  { id: 2, title: 'Half-Life: Alyx', price: 1499, platform: ['VR'], genre: 'Action', image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=500', rating: 5.0 },
  { id: 3, title: 'Beat Saber', price: 999, platform: ['VR'], genre: 'Music', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500', rating: 4.8 },
  { id: 4, title: 'Call of Duty Mobile', price: 0, platform: ['Mobile'], genre: 'Shooter', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500', rating: 4.2 },
  { id: 5, title: 'Genshin Impact', price: 0, platform: ['PC', 'Mobile'], genre: 'RPG', image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500', rating: 4.6 },
  { id: 6, title: 'Red Dead Redemption 2', price: 3499, platform: ['PC', 'Console'], genre: 'Adventure', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500', rating: 4.9 },
  { id: 7, title: 'Among Us', price: 199, platform: ['Mobile', 'PC'], genre: 'Casual', image: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=500', rating: 4.1 },
  { id: 8, title: 'Minecraft', price: 799, platform: ['PC', 'Mobile', 'Console'], genre: 'Sandbox', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500', rating: 4.7 },
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [library, setLibrary] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('store');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
                        onClick={() => toggleLibrary(game.id)}
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
