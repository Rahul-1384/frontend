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
  }), []); // Empty array ensures it's only created once

  const [metrics, setMetrics] = useState({
    activeUsers: 0,
    satisfiedCustomers: 0,
    globalReach: 0
  });
  
  const [selectedCard, setSelectedCard] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Memoize trend data generation
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
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="month" 
            stroke="#94a3b8" 
            fontSize={12}
            tickLine={false}
          />
          <YAxis 
            stroke="#94a3b8" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={value => `${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip 
            contentStyle={{ 
              background: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
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
          bg-white rounded-xl shadow-lg p-6
          transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer
          ${isSelected ? 'ring-2 ring-offset-2 ring-blue-500' : ''}
        `}
        onClick={() => setSelectedCard(isSelected ? null : index)}
      >
        <div className="relative group">
          <div className={`
            w-16 h-16 mx-auto mb-4 p-3 rounded-full
            bg-gradient-to-br from-${color}-100 to-${color}-200 shadow-inner
            transition-transform duration-300 group-hover:scale-110
          `}>
            <Icon className={`w-full h-full text-${color}-500`} />
          </div>

          <div className="absolute -top-2 -right-2 animate-pulse">
            <Sparkle className={`w-5 h-5 text-${color}-500`} />
          </div>
        </div>

        <h3 className={`
          text-3xl font-bold text-${color}-500 mb-2
          transition-all duration-300
          ${isSelected ? 'scale-110' : 'scale-100'}
        `}>
          {value.toLocaleString()}+
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 font-medium">{label}</p>

        {isSelected && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className={`w-4 h-4 text-${color}-500`} />
                <span className="text-sm font-medium">Growth</span>
              </div>
              <span className={`font-bold text-${color}-500`}>
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
                  color={`var(--${color}-500)`} 
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
      color: "blue",
      details: "Monthly active users across platforms",
      metric: "activeUsers"
    },
    {
      icon: ThumbUpIcon,
      value: metrics.satisfiedCustomers,
      label: "Satisfied Customers",
      color: "green",
      details: "Customers with 4+ star ratings",
      metric: "satisfiedCustomers"
    },
    {
      icon: GlobeAltIcon,
      value: metrics.globalReach,
      label: "Global Reach",
      color: "purple",
      details: "Countries with active users",
      metric: "globalReach"
    }
  ];

  return (
    <section className={`py-12 bg-gradient-to-b from-gray-50 to-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Our Growing{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-purple-500">
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