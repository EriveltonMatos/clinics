import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Lock } from 'lucide-react';

// Types for our component props
interface CalendarProps {
  availableDates: string[];
  availableSlots?: AppointmentSlot[];
  onSelectDate: (date: string) => void;
  onSelectShift?: (shiftData: string) => void;
  className?: string;
}

interface AppointmentSlot {
  date: string;
  shift: string;
  appointmentId: string;
}

export default function AppointmentCalendar({ 
  availableDates, 
  availableSlots = [], 
  onSelectDate, 
  onSelectShift,
  className = '' 
}: CalendarProps) {
  // State for current month/year view
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableMonths, setAvailableMonths] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [shiftsForSelectedDate, setShiftsForSelectedDate] = useState<AppointmentSlot[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [selectedShift, setSelectedShift] = useState<string | null>(null);

  // Create a lookup object for quick checking if a date is available
  const availableDatesMap = availableDates.reduce((acc, date) => {
    acc[date] = true;
    return acc;
  }, {} as Record<string, boolean>);

  // Determine which months have available dates
  useEffect(() => {
    if (availableDates.length === 0) return;

    const months = new Set<string>();
    
    availableDates.forEach(dateStr => {
      const [year, month] = dateStr.split('-');
      months.add(`${year}-${month}`);
    });

    const sortedMonths = Array.from(months).map(yearMonth => {
      const [year, month] = yearMonth.split('-');
      return new Date(parseInt(year), parseInt(month) - 1, 1);
    }).sort((a, b) => a.getTime() - b.getTime());

    setAvailableMonths(sortedMonths);
    
    // Set initial month to first available month
    if (sortedMonths.length > 0) {
      setCurrentMonth(sortedMonths[0]);
    }
  }, [availableDates]);

  // Navigate to previous month (if available)
  const goToPreviousMonth = () => {
    if (isLocked) return; // Bloqueia navegação quando locked
    
    const currentIndex = availableMonths.findIndex(
      date => date.getMonth() === currentMonth.getMonth() && date.getFullYear() === currentMonth.getFullYear()
    );
    
    if (currentIndex > 0) {
      setCurrentMonth(availableMonths[currentIndex - 1]);
    }
  };

  // Navigate to next month (if available)
  const goToNextMonth = () => {
    if (isLocked) return; // Bloqueia navegação quando locked
    
    const currentIndex = availableMonths.findIndex(
      date => date.getMonth() === currentMonth.getMonth() && date.getFullYear() === currentMonth.getFullYear()
    );
    
    if (currentIndex < availableMonths.length - 1) {
      setCurrentMonth(availableMonths[currentIndex + 1]);
    }
  };

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Format date as YYYY-MM-DD
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Format date for display (DD/MM/YYYY)
  const formatDateForDisplay = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleDateSelection = (dateString: string) => {
    if (isLocked) return; // Impede seleção de nova data quando locked
    
    setSelectedDate(dateString);
    
    const shifts = availableSlots.filter(slot => slot.date === dateString);
    setShiftsForSelectedDate(shifts);
    
    onSelectDate(dateString);
  };

  const handleShiftSelection = (shift: string, appointmentId: string) => {
    if (isLocked) return; // Impede seleção de novo turno quando locked
    
    // Bloqueia o calendário após seleção do turno
    setIsLocked(true);
    setSelectedShift(shift);
    
    if (onSelectShift) {
      const shiftData = JSON.stringify({
        shift,
        appointmentId,
        date: selectedDate,
      });
      onSelectShift(shiftData);
    }
  };

  // Get shift label
  const getShiftLabel = (shift: string): string => {
    switch(shift) {
      case "MOR": return "Manhã";
      case "AFT": return "Tarde";
      case "EVE": return "Noite";
      default: return shift;
    }
  };

  // Build calendar for current month
  const buildCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get first day of month
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = getDaysInMonth(year, month);
    
    // Create array for all days
    const days = [];
    
    // Add empty cells for days before start of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }
    
    // Create date cells
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = formatDate(date);
      const isAvailable = availableDatesMap[dateString];
      const isSelected = selectedDate === dateString;
      
      // Define classes baseado no estado
      let cellClasses = `flex items-center justify-center h-8 w-8 rounded-full mx-auto `;
      
      if (isSelected && isLocked) {
        // Data selecionada e calendário bloqueado
        cellClasses += 'bg-green-500 text-white ring-2 ring-green-300';
      } else if (isSelected) {
        // Data selecionada mas ainda não bloqueado
        cellClasses += 'bg-blue-500 text-white';
      } else if (isAvailable && !isLocked) {
        // Data disponível e calendário não bloqueado
        cellClasses += 'bg-green-100 hover:bg-green-200 text-green-800 cursor-pointer';
      } else if (isAvailable && isLocked) {
        // Data disponível mas calendário bloqueado
        cellClasses += 'bg-gray-200 text-gray-400';
      } else {
        // Data não disponível
        cellClasses += 'text-gray-300 bg-gray-100';
      }
      
      days.push(
        <div 
          key={dateString}
          className={cellClasses}
          onClick={() => isAvailable && !isLocked && handleDateSelection(dateString)}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  // Current month name and year
  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const currentYear = currentMonth.getFullYear();

  // Can navigate to previous/next month?
  const currentIndex = availableMonths.findIndex(
    date => date.getMonth() === currentMonth.getMonth() && date.getFullYear() === currentMonth.getFullYear()
  );
  const canGoPrevious = currentIndex > 0 && !isLocked;
  const canGoNext = currentIndex < availableMonths.length - 1 && !isLocked;

  return (
    <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
      {/* Header com indicador de bloqueio */}
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={goToPreviousMonth} 
          disabled={!canGoPrevious}
          className={`p-1 rounded-full ${canGoPrevious ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-300'}`}
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-gray-800">
            {monthName} {currentYear}
          </h2>
          {isLocked && (
            <div className="flex items-center text-green-600" title="Agendamento confirmado">
              <Lock size={16} />
            </div>
          )}
        </div>
        
        <button 
          onClick={goToNextMonth} 
          disabled={!canGoNext}
          className={`p-1 rounded-full ${canGoNext ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-300'}`}
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {buildCalendar()}
      </div>
      
      {/* Legenda */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-100 mr-1"></div>
          <span>Datas disponíveis</span>
        </div>
        {isLocked && (
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
            <span className="text-green-600 font-medium">Agendamento confirmado</span>
          </div>
        )}
      </div>
      
      {selectedDate && (
        <div className="mt-4 border-t pt-4">
          <div className="flex items-center mb-2">
            <Clock size={16} className="mr-1 text-gray-500" />
            <h3 className="font-medium text-gray-700">
              Turnos disponíveis para {formatDateForDisplay(selectedDate)}:
            </h3>
          </div>
          
          {shiftsForSelectedDate.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {shiftsForSelectedDate.map((slot, index) => {
                const isSelectedShift = selectedShift === slot.shift;
                return (
                  <button
                    key={index}
                    onClick={() => handleShiftSelection(slot.shift, slot.appointmentId)}
                    disabled={isLocked}
                    className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                      isSelectedShift && isLocked
                        ? 'bg-green-500 text-white ring-2 ring-green-300'
                        : isLocked
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-50 hover:bg-blue-100 text-blue-700 cursor-pointer'
                    }`}
                  >
                    {getShiftLabel(slot.shift)}
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Nenhum turno disponível para esta data.</p>
          )}
          
          {/* Mensagem de confirmação quando bloqueado */}
          {isLocked && selectedShift && (
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-700 text-sm font-medium">
                ✓ Agendamento confirmado para {formatDateForDisplay(selectedDate)} no turno da {getShiftLabel(selectedShift).toLowerCase()}
              </p>
                           
            </div>
          )}
        </div>
      )}
    </div>
  );
}