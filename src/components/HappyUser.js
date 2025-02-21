import React, { useState, useEffect, useCallback, useMemo } from "react";
import { UserGroupIcon, ThumbUpIcon, GlobeAltIcon } from "@heroicons/react/solid";
import { TrendingUp, Sparkle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const HappyUser = ({ 
  stats = null,
  animationDuration = 7000,
  animationStagger = 200,
  enableCharts = true,
  className 
}) => {
  const defaultStats = useMemo(() => ({
    activeUsers: 12000,
    globalReach: 10000,
    satisfiedCustomers: 20000,
  }), []);

  const [metrics, setMetrics] = useState({
    activeUsers: 0,
    satisfiedCustomers: 0,
    globalReach: 0
  });
  
  const [selectedCard, setSelectedCard] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const generateTrendData = useCallback((baseValue) => {
    return Array.from({ length: 12 }, (_, i) => ({
      month: new Date(0, i).toLocaleString('default', { month: 'short' }),
      value: Math.floor(baseValue * (0.8 + Math.random() * 0.4))
    }));
  }, []);

  const trendData = useMemo(() => ({
    activeUsers: generateTrendData(defaultStats.activeUsers),
    satisfiedCustomers: generateTrendData(defaultStats.satisfiedCustomers),
    globalReach: generateTrendData(defaultStats.globalReach)
  }), [defaultStats.activeUsers, defaultStats.globalReach, defaultStats.satisfiedCustomers, generateTrendData]);

  const animateValue = useCallback((start, end, duration, setValue) => {
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(easeOutCubic * (end - start) + start));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const targetValues = stats || defaultStats;

    if (!hasAnimated) {
      Object.entries(targetValues).forEach(([key, value], index) => {
        setTimeout(() => {
          animateValue(0, value, animationDuration, (newValue) => 
            setMetrics(prev => ({ ...prev, [key]: newValue }))
          );
        }, index * animationStagger);
      });
      setHasAnimated(true);
    }
  }, [stats, hasAnimated, animationDuration, animationStagger, animateValue, defaultStats]);

  const DetailChart = ({ data, color }) => (
    <div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.2}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="month" 
            stroke="#64748b" 
            fontSize={12}
            tickLine={false}
          />
          <YAxis 
            stroke="#64748b" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={value => `${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip 
            contentStyle={{ 
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}
            formatter={value => [`${value.toLocaleString()}`, 'Value']}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke={color}
            fill={`url(#gradient-${color})`}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );

  const StatCard = ({ icon: Icon, value, label, color, details, metric, index }) => {
    const isSelected = selectedCard === index;
    
    const getGrowthRate = () => {
      const data = trendData[metric];
      const lastTwo = data.slice(-2);
      return ((lastTwo[1].value - lastTwo[0].value) / lastTwo[0].value * 100).toFixed(1);
    };

    return (
      <div 
        className={`
          bg-white rounded-xl shadow-sm border border-gray-100
          transition-all duration-300 hover:shadow-md cursor-pointer
          ${isSelected ? 'ring-2 ring-offset-2' : ''}
          ${color === 'indigo' ? 'ring-indigo-500' : ''}
          ${color === 'emerald' ? 'ring-emerald-500' : ''}
          ${color === 'violet' ? 'ring-violet-500' : ''}
          p-6
        `}
        onClick={() => setSelectedCard(isSelected ? null : index)}
      >
        <div className="relative group">
          <div className={`
            w-16 h-16 mx-auto mb-4 p-3 rounded-full
            ${color === 'indigo' ? 'bg-indigo-50' : ''}
            ${color === 'emerald' ? 'bg-emerald-50' : ''}
            ${color === 'violet' ? 'bg-violet-50' : ''}
            transition-transform duration-300 group-hover:scale-110
          `}>
            <Icon className={`
              w-full h-full
              ${color === 'indigo' ? 'text-indigo-500' : ''}
              ${color === 'emerald' ? 'text-emerald-500' : ''}
              ${color === 'violet' ? 'text-violet-500' : ''}
            `} />
          </div>

          <div className="absolute -top-2 -right-2 animate-pulse">
            <Sparkle className={`
              w-5 h-5
              ${color === 'indigo' ? 'text-indigo-500' : ''}
              ${color === 'emerald' ? 'text-emerald-500' : ''}
              ${color === 'violet' ? 'text-violet-500' : ''}
            `} />
          </div>
        </div>

        <h3 className={`
          text-3xl font-bold mb-2
          ${color === 'indigo' ? 'text-indigo-600' : ''}
          ${color === 'emerald' ? 'text-emerald-600' : ''}
          ${color === 'violet' ? 'text-violet-600' : ''}
          transition-all duration-300
          ${isSelected ? 'scale-110' : 'scale-100'}
        `}>
          {value.toLocaleString()}+
        </h3>
        
        <p className="text-gray-600 font-medium">{label}</p>

        {isSelected && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className={`
                  w-4 h-4
                  ${color === 'indigo' ? 'text-indigo-500' : ''}
                  ${color === 'emerald' ? 'text-emerald-500' : ''}
                  ${color === 'violet' ? 'text-violet-500' : ''}
                `} />
                <span className="text-sm font-medium">Growth</span>
              </div>
              <span className={`
                font-bold
                ${color === 'indigo' ? 'text-indigo-500' : ''}
                ${color === 'emerald' ? 'text-emerald-500' : ''}
                ${color === 'violet' ? 'text-violet-500' : ''}
              `}>
                {getGrowthRate()}%
              </span>
            </div>

            {enableCharts && (
              <div className="pt-4">
                <h4 className="font-medium mb-4 text-sm text-gray-600">
                  Monthly Trend
                </h4>
                <DetailChart 
                  data={trendData[metric]} 
                  color={color === 'indigo' ? '#6366f1' : color === 'emerald' ? '#10b981' : '#8b5cf6'} 
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const stat = [
    {
      icon: UserGroupIcon,
      value: metrics.activeUsers,
      label: "Active Users",
      color: "indigo",
      details: "Monthly active users across platforms",
      metric: "activeUsers"
    },
    {
      icon: ThumbUpIcon,
      value: metrics.satisfiedCustomers,
      label: "Satisfied Customers",
      color: "emerald",
      details: "Customers with 4+ star ratings",
      metric: "satisfiedCustomers"
    },
    {
      icon: GlobeAltIcon,
      value: metrics.globalReach,
      label: "Global Reach",
      color: "violet",
      details: "Countries with active users",
      metric: "globalReach"
    }
  ];

  return (
    <section className={`py-12 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Our Growing{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-emerald-500 to-violet-500">
            Community
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stat.map((stat, index) => (
            <StatCard key={stat.metric} {...stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HappyUser;