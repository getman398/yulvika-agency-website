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
      <header className="border-b border-border bg-white sticky top-0 z-50">
        <div className="w-full px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="https://cdn.poehali.dev/projects/5d745404-d0cf-45de-9876-0b7cea27bb6e/files/cda7b47e-e85b-44b6-91f5-6f96b020f9ef.jpg"
              alt="СТИМУЛ лого" 
              className="h-10 w-10 object-contain"
            />
            <span className="text-2xl font-bold text-primary">СТИМУЛ</span>
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
      <section className="relative py-20 px-8 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="w-full text-center">
          <div className="max-w-5xl mx-auto">
            <Badge variant="outline" className="mb-4">Кадровое агентство нового поколения</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 leading-tight">
              Ваш <span className="text-destructive">стимул</span><br />
              к росту бизнеса —<br />
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
              <h2 className="text-3xl font-bold text-primary mb-6">СТИМУЛ — даём импульс вашему бизнесу</h2>
              <p className="text-muted-foreground text-lg mb-6">
                Находим не просто сотрудников, а настоящих профессионалов с мотивацией к развитию. 
                Специализируемся на подборе кадров для банковской сферы, IT и крупного корпоративного сектора. 
                Каждый кандидат — это стимул к новым достижениям вашей компании.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Закрытых вакансий</div>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">120+</div>
                  <div className="text-sm text-muted-foreground">Довольных клиентов</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://cdn.poehali.dev/projects/5d745404-d0cf-45de-9876-0b7cea27bb6e/files/14344a00-d713-4091-918a-31618184cbc4.jpg" 
                alt="Команда СТИМУЛ" 
                className="rounded-xl shadow-lg w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tariff Plans */}
      <section id="tariffs" className="py-16 px-8 bg-secondary/20">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Тарифные планы</Badge>
            <h2 className="text-3xl font-bold text-primary mb-4">Выберите подходящий тариф</h2>
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
      <section id="advantages" className="py-16 px-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Наши преимущества</Badge>
            <h2 className="text-3xl font-bold text-primary mb-4">Почему с нами выгодно работать</h2>
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

      {/* Contacts & Contact Form */}
      <section id="contacts" className="py-16 px-8 bg-primary/5">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <Badge variant="outline" className="mb-4">Контакты</Badge>
              <h2 className="text-3xl font-bold text-primary mb-6">Свяжитесь с нами</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Готовы обсудить ваши потребности в персонале и предложить оптимальное решение.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Phone" size={20} className="text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold">Телефон</div>
                    <div className="text-muted-foreground">+7 919 903 9250</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Mail" size={20} className="text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-muted-foreground">rabota@stimul-ka.ru</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="MapPin" size={20} className="text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold">Адрес</div>
                    <div className="text-muted-foreground">Москва, ул. Деловая, 15, офис 301</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Clock" size={20} className="text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold">Время работы</div>
                    <div className="text-muted-foreground">Пн-Пт: 9:00 - 18:00</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Партнёрство */}
            <div className="relative">
              <img 
                src="https://cdn.poehali.dev/projects/5d745404-d0cf-45de-9876-0b7cea27bb6e/files/62e33a4e-d58a-44ca-94ff-83251c6ecefb.jpg" 
                alt="Успешное партнёрство" 
                className="rounded-xl shadow-lg w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  src="https://cdn.poehali.dev/projects/5d745404-d0cf-45de-9876-0b7cea27bb6e/files/cda7b47e-e85b-44b6-91f5-6f96b020f9ef.jpg"
                  alt="СТИМУЛ лого" 
                  className="h-8 w-8 object-contain"
                />
                <span className="text-xl font-bold">СТИМУЛ</span>
              </div>
              <p className="text-primary-foreground/70 text-sm">
                Даём импульс вашему бизнесу через профессиональные команды
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <div className="space-y-2 text-sm">
                <div className="text-primary-foreground/70">Подбор персонала</div>
                <div className="text-primary-foreground/70">Executive Search</div>
                <div className="text-primary-foreground/70">Массовый рекрутинг</div>
                <div className="text-primary-foreground/70">Аутстаффинг</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Отрасли</h4>
              <div className="space-y-2 text-sm">
                <div className="text-primary-foreground/70">Банки и финансы</div>
                <div className="text-primary-foreground/70">IT и интернет</div>
                <div className="text-primary-foreground/70">Производство</div>
                <div className="text-primary-foreground/70">Розничная торговля</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm">
                <div className="text-primary-foreground/70">+7 919 903 9250</div>
                <div className="text-primary-foreground/70">rabota@stimul-ka.ru</div>
                <div className="text-primary-foreground/70">Москва, ул. Деловая, 15</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="text-primary-foreground/70">
              © 2024 СТИМУЛ. Все права защищены.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground">Политика конфиденциальности</a>
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground">Пользовательское соглашение</a>
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