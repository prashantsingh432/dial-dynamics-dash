
import React from 'react';
import { useDashboard } from '@/context/DashboardContext';
import KPICard from './KPICard';
import { Phone, PhoneCall, Clock, Calendar, CalendarCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const KPISection: React.FC = () => {
  const { data, isAnimating } = useDashboard();
  const { kpis } = data;
  
  // Format for minutes
  const formatMinutes = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <KPICard
        title="Total Dials"
        value={kpis.totalDials.current}
        icon={<Phone className="w-5 h-5" />}
        className={isAnimating ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}
        index={0}
      />
      
      <KPICard
        title="Total Connected"
        value={kpis.totalConnected.current}
        icon={<PhoneCall className="w-5 h-5" />}
        className={isAnimating ? 'opacity-0' : 'opacity-100 transition-opacity duration-300 delay-75'}
        index={1}
      />
      
      <KPICard
        title="Total Talk Time"
        value={kpis.totalTalkTime.current}
        icon={<Clock className="w-5 h-5" />}
        formatter={formatMinutes}
        className={isAnimating ? 'opacity-0' : 'opacity-100 transition-opacity duration-300 delay-150'}
        index={2}
      />
      
      <KPICard
        title="Scheduled Meetings"
        value={kpis.scheduledMeetings.current}
        icon={<Calendar className="w-5 h-5" />}
        className={isAnimating ? 'opacity-0' : 'opacity-100 transition-opacity duration-300 delay-225'}
        index={3}
      />
      
      <KPICard
        title="Successful Meetings"
        value={kpis.successfulMeetings.current}
        icon={<CalendarCheck className="w-5 h-5" />}
        className={isAnimating ? 'opacity-0' : 'opacity-100 transition-opacity duration-300 delay-300'}
        index={4}
      />
    </motion.div>
  );
};

export default KPISection;
