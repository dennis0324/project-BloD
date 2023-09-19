'use client';

import type { Item } from '@src/components/tab-group';
import clsx from 'clsx';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

export const Tab = ({
  path,
  parallelRoutesKey,
  item,
  onClick
}: {
  path: string;
  parallelRoutesKey?: string;
  item: Item;
  onClick?: () => void
}) => {
  const segment = useSelectedLayoutSegment(parallelRoutesKey);

  const href = item.slug ? path + '/' + item.slug : path;
  const isActive =
    // Example home pages e.g. `/layouts`
    (!item.slug && segment === null) ||
    segment === item.segment ||
    // Nested pages e.g. `/layouts/electronics`
    segment === item.slug;

  return (
    <Link
      href={href}
      className={clsx('rounded-lg px-3 py-1 text-sm font-medium', {
        'bg-gray-700 text-gray-100 hover:bg-gray-500 hover:text-white':
          !isActive,
        'bg-vercel-blue text-white': isActive,
      })}
      onClick={onClick}
    >
      {item.text}
    </Link>
  );
};