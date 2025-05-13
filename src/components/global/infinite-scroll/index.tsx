import Spinner from "@/components/ui/spinner";
import React, { useEffect, useRef, useCallback } from "react";

interface InfiniteScrollProps {
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  children: React.ReactNode;
  className?: string;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  loading,
  hasMore,
  loadMore,
  children,
  className,
}) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !loading && hasMore) {
        loadMore();
      }
    },
    [loading, hasMore],
  );

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "100px",
      threshold: 1.0,
    });

    if (bottomRef.current) observer.current.observe(bottomRef.current);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [handleObserver]);

  return (
    <div className={className}>
      {children}

      {loading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="sm" />
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default InfiniteScroll;
