import { Calendar, Clock, MapPin, Share2, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import NavBar from '@/components/Navbar';
import carrossel1 from "@/assets/carrossel1.png";
import FooterSection from '@/components/home-sections/FooterSection';
import MobileNav from '@/components/MobileNav';
import NavbarReturn from "@/components/NavbarReturn";
import { FaArrowLeft } from 'react-icons/fa';
import Image from 'next/image';



const EventPage = () => {
  const eventData = {
    title: "Campanha de Prevenção ao Diabetes",
    date: "27 de Outubro, 2024",
    time: "09:00 - 12:00",
    location: "Clínica Central - 2º Andar",
    image: {carrossel1},
    description: "Junte-se a nós em nossa campanha de prevenção ao diabetes. Nossa equipe de endocrinologistas estará realizando testes gratuitos de glicemia e oferecendo orientações sobre prevenção e tratamento do diabetes. Não perca esta oportunidade de cuidar da sua saúde!",
    status: "Vagas Disponíveis",
    category: "Prevenção",
    speakers: [
      {
        name: "Dra. Maria Silva",
        role: "Endocrinologista",
        avatar: "/api/placeholder/40/40"
      },
      {
        name: "Dr. João Santos",
        role: "Nutricionista",
        avatar: "/api/placeholder/40/40"
      }
    ],
    highlights: [
      "Testes gratuitos de glicemia",
      "Consulta com especialistas",
      "Material informativo",
      "Orientações nutricionais"
    ],
    contact: {
      phone: "(11) 1234-5678",
      email: "eventos@clinica.com"
    }
  };

  return (
    <div className='bg-gradient-to-br from-blue-100 to-indigo-200'>
    <NavBar />
    <MobileNav links={[{href: "/", label: "Voltar ao site", icon: <FaArrowLeft /> }]} />  
    <NavbarReturn />
    <div className="container mx-auto mt-20  px-4 py-8 ">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-0">
              <Image
                src={eventData.image.carrossel1.src}
                alt={eventData.title}
                className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover rounded-t-lg"
                height={1000}
                width={1000}
              />
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{eventData.category}</Badge>
                  <Badge variant="outline" className="text-green-600 bg-green-50">
                    {eventData.status}
                  </Badge>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {eventData.title}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600">{eventData.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600">{eventData.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600">{eventData.location}</span>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Sobre o Evento</h2>
                    <p className="text-gray-600 leading-relaxed">
                      {eventData.description}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-3">Palestrantes</h2>
                    <div className="flex flex-wrap gap-4">
                      {eventData.speakers.map((speaker, index) => (
                        <Card key={index} className="flex items-center p-4 space-x-4">
                          <Avatar>
                            <AvatarImage src={speaker.avatar} />
                            <AvatarFallback>{speaker.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{speaker.name}</p>
                            <p className="text-sm text-gray-500">{speaker.role}</p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-3">Destaques</h2>
                    <ScrollArea className="h-[200px] rounded-md border p-4">
                      <ul className="space-y-2">
                        {eventData.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </ScrollArea>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações de Inscrição</CardTitle>
              <CardDescription>
                Garanta sua vaga neste evento especial
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Vagas limitadas</span>
                </div>
                <Badge>Gratuito</Badge>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <p className="font-medium">Contato:</p>
                <p className="text-sm text-gray-600">{eventData.contact.phone}</p>
                <p className="text-sm text-gray-600">{eventData.contact.email}</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Share2 className="w-4 h-4 mr-2" />
                      Compartilhar
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Compartilhar este evento</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
    <FooterSection />
    </div>
    
  );
};

export default EventPage;