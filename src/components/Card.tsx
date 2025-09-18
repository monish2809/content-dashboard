'use client';
import { useDrag, useDrop } from 'react-dnd';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  type: 'news' | 'movie' | 'social';
  url?: string;
}

interface CardProps {
  item: ContentItem;
  index: number;
  moveCard: (from: number, to: number) => void;
}

const Card = ({ item, index, moveCard }: CardProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'card',
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveCard(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <motion.div
      ref={(node) => drag(drop(node))}
      className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md ${isDragging ? 'opacity-50' : ''}`}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={item.image || '/placeholder.jpg'}
        alt={item.title}
        className="w-full h-48 object-cover rounded-md mb-2"
        onError={(e) => (e.currentTarget.src = '/placeholder.jpg')}
      />
      <h3 className="text-lg font-semibold dark:text-white">{item.title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
      <Link href={item.url || '#'} className="text-blue-500 hover:underline">
        {item.type === 'movie' ? 'Watch Now' : 'Read More'}
      </Link>
    </motion.div>
  );
};

export default Card;