
import React from 'react';
import { useDashboard } from '@/context/DashboardContext';
import KPICard from './KPICard';
import { Phone, Check, Clock, Calendar, CheckCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatMinutes } from '@/lib/formatters';

const KPISection: React.FC = () => {
  const { data, isAnimating } = useDashboard();
  const { kpis } = data;
  
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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <KPICard
        title="Total Dials"
        value={kpis.totalDials.current}
        percentChange={kpis.totalDials.percentChange}
        icon={<Phone className="w-5 h-5" strokeWidth={1.5} />}
        color="purple"
        index={0}
      />
      
      <KPICard
        title="Total Connected"
        value={kpis.totalConnected.current}
        percentChange={kpis.totalConnected.percentChange}
        icon={<Check className="w-5 h-5" strokeWidth={1.5} />}
        color="green"
        index={1}
      />
      
      <KPICard
        title="Total Talk Time"
        value={kpis.totalTalkTime.current}
        percentChange={kpis.totalTalkTime.percentChange}
        icon={<Clock className="w-5 h-5" strokeWidth={1.5} />}
        formatter={formatMinutes}
        color="amber"
        index={2}
      />
      
      <KPICard
        title="Scheduled Meetings"
        value={kpis.scheduledMeetings.current}
        percentChange={kpis.scheduledMeetings.percentChange}
        icon={<Calendar className="w-5 h-5" strokeWidth={1.5} />}
        color="rose"
        index={3}
      />
      
      <KPICard
        title="Successful Meetings"
        value={kpis.successfulMeetings.current}
        percentChange={kpis.successfulMeetings.percentChange}
        icon={<CheckCheck className="w-5 h-5" strokeWidth={1.5} />}
        color="cyan"
        index={4}
      />
    </motion.div>
  );
};

export default KPISection;
