import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import TariffModal from "@/components/TariffModal";

export default function Index() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    tariffName: string;
    tariffPrice: string;
  }>({ isOpen: false, tariffName: "", tariffPrice: "" });

  const [contactForm, setContactForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: ""
  });

  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);

  const scrollToContactForm = () => {
    const contactSection = document.getElementById('contacts');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openModal = (tariffName: string, tariffPrice: string) => {
    setModalState({ isOpen: true, tariffName, tariffPrice });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, tariffName: "", tariffPrice: "" });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsContactSubmitting(true);

    try {
      // Отправляем данные на PHP API
      const response = await fetch('/api/save-contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contactForm.name,
          phone: contactForm.phone,
          email: contactForm.email,
          message: contactForm.message
        })
      });

      const result = await response.json();

      if (result.success) {
        setIsContactSubmitted(true);
        setContactForm({ name: "", company: "", email: "", phone: "", message: "" });
        
        setTimeout(() => {
          setIsContactSubmitted(false);
        }, 3000);
      } else {
        throw new Error(result.message || 'Ошибка при отправке заявки');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Произошла ошибка при отправке заявки. Попробуйте еще раз.');
    } finally {
      setIsContactSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="w-full px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">А</span>
            </div>
            <span className="text-2xl font-bold text-primary">АЛЬЯНС</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Услуги</a>
            <a href="#tariffs" className="text-muted-foreground hover:text-primary transition-colors">Тарифы</a>
            <a href="#advantages" className="text-muted-foreground hover:text-primary transition-colors">Преимущества</a>
            <a href="#contacts" className="text-muted-foreground hover:text-primary transition-colors">Контакты</a>
          </nav>
          <Button className="hidden md:inline-flex" onClick={scrollToContactForm}>Получить консультацию</Button>
          <Button variant="outline" size="sm" className="md:hidden">
            <Icon name="Menu" size={20} />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-8 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="w-full text-center">
          <div className="max-w-5xl mx-auto">
            <Badge variant="outline" className="mb-4">Кадровое агентство полного цикла</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Надёжный <span className="text-primary">альянс</span><br />
              для роста вашего бизнеса —<br />
              профессиональная команда
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Подбираем мотивированных специалистов для банков, IT-компаний и крупного бизнеса. 
              Создаём команды, которые достигают результатов.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" onClick={scrollToContactForm}>
              Подобрать персонал
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* About Company */}
      <section id="services" className="py-16 px-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">О компании</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-6">Альянс — ваш партнёр в подборе персонала</h2>
              <p className="text-muted-foreground text-lg mb-6">
                Кадровое агентство полного цикла с многолетним опытом работы. 
                Мы создаём стратегические альянсы между работодателями и кандидатами, 
                обеспечивая идеальное соответствие компетенций и корпоративной культуры. 
                Специализируемся на подборе персонала для банков, IT-компаний и крупного бизнеса.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">800+</div>
                  <div className="text-sm text-muted-foreground">Закрытых вакансий</div>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">200+</div>
                  <div className="text-sm text-muted-foreground">Довольных клиентов</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-xl shadow-lg w-full h-[400px] bg-gradient-to-br from-primary/30 to-accent/30 border border-primary/20 flex items-center justify-center">
                <div className="text-center">
                  <Icon name="Users" size={120} className="text-primary mx-auto mb-4" />
                  <p className="text-2xl font-bold text-foreground">Профессиональная команда</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tariff Plans */}
      <section id="tariffs" className="py-16 px-8 bg-secondary/30">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Тарифные планы</Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4">Выберите подходящий тариф</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Гибкие условия сотрудничества для компаний любого масштаба
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Лайт */}
            <Card className="relative border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="text-center pb-6">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Zap" size={24} className="text-primary" />
                </div>
                <CardTitle className="text-2xl">Лайт</CardTitle>
                <div className="text-3xl font-bold text-primary">от 50 000₽</div>
                <div className="text-sm text-muted-foreground">за закрытую вакансию</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm">Подбор специалистов среднего звена</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm">Гарантия замены 3 месяца</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm">Срок закрытия до 30 дней</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm">Email поддержка</span>
                </div>
                <Button className="w-full mt-6" variant="outline" onClick={() => openModal("Лайт", "от 50 000₽")}>Выбрать план</Button>
              </CardContent>
            </Card>

            {/* Стандарт */}
            <Card className="relative border-2 border-primary shadow-lg scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-destructive text-destructive-foreground">Популярный</Badge>
              </div>
              <CardHeader className="text-center pb-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Star" size={24} className="text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Стандарт</CardTitle>
                <div className="text-3xl font-bold text-primary">от 80 000₽</div>
                <div className="text-sm text-muted-foreground">за закрытую вакансию</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm">Подбор руководящих позиций</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm">Гарантия замены 6 месяцев</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm">Срок закрытия до 20 дней</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm">Персональный менеджер</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm">Психологическое тестирование</span>
                </div>
                <Button className="w-full mt-6" onClick={() => openModal("Стандарт", "от 80 000₽")}>Выбрать план</Button>
              </CardContent>
            </Card>

            {/* Профи */}
            <Card className="relative border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="text-center pb-6">
                <div className="w-12 h-12 bg-destructive rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Crown" size={24} className="text-destructive-foreground" />
                </div>
                <CardTitle className="text-2xl">Профи</CardTitle>
                <div className="text-3xl font-bold text-primary">от 150 000₽</div>
                <div className="text-sm text-muted-foreground">за закрытую вакансию</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm">Подбор топ-менеджеров</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm">Гарантия замены 12 месяцев</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm">Срок закрытия до 14 дней</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm">Dedicated команда</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm">Executive поиск</span>
                </div>
                <Button className="w-full mt-6" variant="outline" onClick={() => openModal("Профи", "от 150 000₽")}>Выбрать план</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section id="advantages" className="py-16 px-8 bg-background">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Наши преимущества</Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4">Почему с нами выгодно работать</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Многолетний опыт и проверенные методики подбора персонала
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Clock" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Быстрый результат</h3>
                <p className="text-muted-foreground">
                  Средний срок закрытия вакансии — 20 дней. Экспресс-подбор за 7 дней для критичных позиций.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Shield" size={32} className="text-destructive" />
                </div>
                <h3 className="text-xl font-semibold mb-4">100% гарантия</h3>
                <p className="text-muted-foreground">
                  Бесплатная замена кандидата в течение гарантийного периода. Возврат средств при неуспехе.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Users" size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Экспертиза</h3>
                <p className="text-muted-foreground">
                  Глубокие знания банковской сферы и IT-индустрии. Проверенная база из 50 000+ специалистов.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Cases */}
      <section className="py-16 px-8 bg-secondary/30">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Кейсы</Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4">Успешные проекты</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Реальные результаты нашей работы с крупными компаниями
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon name="Building2" size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Крупный банк</h3>
                    <p className="text-sm text-muted-foreground">Финансовый сектор</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Закрыли 25 позиций в IT-департаменте за 45 дней. Подобрали команду разработчиков, аналитиков и архитекторов.
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div>
                    <div className="text-2xl font-bold text-primary">25</div>
                    <div className="text-muted-foreground">вакансий</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">45</div>
                    <div className="text-muted-foreground">дней</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Icon name="Code2" size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">IT-компания</h3>
                    <p className="text-sm text-muted-foreground">Технологии</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Собрали команду из 15 специалистов для запуска нового продукта. CTO, тимлиды и senior-разработчики.
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div>
                    <div className="text-2xl font-bold text-primary">15</div>
                    <div className="text-muted-foreground">специалистов</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">30</div>
                    <div className="text-muted-foreground">дней</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Icon name="Factory" size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Производство</h3>
                    <p className="text-sm text-muted-foreground">Промышленность</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Провели массовый подбор персонала — 120 человек за 2 месяца. От рабочих до руководителей отделов.
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div>
                    <div className="text-2xl font-bold text-primary">120</div>
                    <div className="text-muted-foreground">человек</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">60</div>
                    <div className="text-muted-foreground">дней</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-8 bg-background">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Отзывы</Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4">Что говорят наши клиенты</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Отзывы руководителей компаний о сотрудничестве с нами
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "Альянс помог нам закрыть критически важные позиции в кратчайшие сроки. Профессиональный подход и качественная работа с кандидатами. Рекомендуем!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">АС</span>
                  </div>
                  <div>
                    <div className="font-semibold">Алексей Смирнов</div>
                    <div className="text-sm text-muted-foreground">HR-директор, Финансовая группа</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "Работаем с агентством уже 3 года. Всегда подбирают точно под наши требования, понимают специфику IT-рынка. Благодарим за сотрудничество!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">ЕК</span>
                  </div>
                  <div>
                    <div className="font-semibold">Елена Кузнецова</div>
                    <div className="text-sm text-muted-foreground">CEO, IT-компания TechSolutions</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "Массовый подбор персонала прошёл на высшем уровне. Отличное соотношение цены и качества. Все сотрудники прошли испытательный срок успешно."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">ДП</span>
                  </div>
                  <div>
                    <div className="font-semibold">Дмитрий Петров</div>
                    <div className="text-sm text-muted-foreground">Директор по персоналу, Производство</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="py-20 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-accent/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05),transparent_50%)]"></div>
        
        <div className="w-full max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">Свяжитесь с нами</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Начните сотрудничество<br />с агентством Альянс
            </h2>
            <p className="text-white/90 text-xl max-w-3xl mx-auto">
              Оставьте заявку, и мы свяжемся с вами в течение часа для обсуждения вашего проекта
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Phone" size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Позвоните нам</h3>
                <a href="tel:+79199039250" className="text-white/90 hover:text-white text-lg font-medium">
                  +7 919 903 9250
                </a>
                <p className="text-white/70 text-sm mt-2">Пн-Пт: 9:00 - 18:00</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Mail" size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Напишите email</h3>
                <a href="mailto:kadri@ka-alians.ru" className="text-white/90 hover:text-white text-lg font-medium">
                  kadri@ka-alians.ru
                </a>
                <p className="text-white/70 text-sm mt-2">Ответим в течение 2 часов</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="MapPin" size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Приезжайте в офис</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  111024, г. Москва,<br />
                  ул. 2-я Энтузиастов, 5/40,<br />
                  помещ. 47у/4
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card/90 backdrop-blur-sm border-primary/30 shadow-2xl max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">Быстрая заявка</h3>
                <p className="text-muted-foreground">
                  Заполните форму, и наш менеджер свяжется с вами для консультации
                </p>
              </div>

              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Ваше имя *</label>
                    <Input 
                      required
                      placeholder="Иван Петров" 
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Телефон *</label>
                    <Input 
                      required
                      type="tel"
                      placeholder="+7 (___) ___-__-__" 
                      className="h-12"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Email *</label>
                  <Input 
                    required
                    type="email"
                    placeholder="ivan@company.ru" 
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Компания</label>
                  <Input 
                    placeholder="Название вашей компании" 
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Комментарий</label>
                  <Textarea 
                    placeholder="Расскажите о вакансиях или задачах по подбору персонала..."
                    className="min-h-[120px]"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full h-14 text-lg">
                  Отправить заявку
                  <Icon name="Send" size={20} className="ml-2" />
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">А</span>
                </div>
                <span className="text-xl font-bold text-foreground">АЛЬЯНС</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Кадровое агентство полного цикла для крупного бизнеса
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Услуги</h4>
              <div className="space-y-2 text-sm">
                <div className="text-muted-foreground">Подбор персонала</div>
                <div className="text-muted-foreground">Executive Search</div>
                <div className="text-muted-foreground">Массовый рекрутинг</div>
                <div className="text-muted-foreground">Аутстаффинг</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Отрасли</h4>
              <div className="space-y-2 text-sm">
                <div className="text-muted-foreground">Банки и финансы</div>
                <div className="text-muted-foreground">IT и интернет</div>
                <div className="text-muted-foreground">Производство</div>
                <div className="text-muted-foreground">Розничная торговля</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Контакты</h4>
              <div className="space-y-2 text-sm">
                <div className="text-muted-foreground">+7 919 903 9250</div>
                <div className="text-muted-foreground">kadri@ka-alians.ru</div>
                <div className="text-muted-foreground">Москва, ул. 2-я Энтузиастов, 5/40</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="text-muted-foreground">
              © 2024 Альянс. Все права защищены.<br />
              ИНН 7703768127
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Политика конфиденциальности</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Пользовательское соглашение</a>
            </div>
          </div>
        </div>
      </footer>
      
      <TariffModal 
        isOpen={modalState.isOpen}
        onClose={closeModal}
        tariffName={modalState.tariffName}
        tariffPrice={modalState.tariffPrice}
      />
    </div>
  );
}