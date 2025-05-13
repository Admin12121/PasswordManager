"use client";

import { useState, useEffect, useCallback } from "react";
import { useGetVaultQuery } from "@/lib/store/api/api";
import { useAuthUser } from "@/hooks/use-auth-user";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { LoaderCircle } from "lucide-react";
import { useDecryptedData } from "@/hooks/dec-data";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
const View = dynamic(() => import("./view"), { ssr: false });

interface VaultData {
  security: boolean;
  slug: string;
  title: string;
  username: string;
  authtoken: boolean;
}

const ViewAll = () => {
  const { accessToken, user } = useAuthUser();
  const [search, setSearch] = useState<string>("");
  const [rowsperpage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [exclude_by, SetExcludeBy] = useState<string>("");
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const {
    data: encryptedData,
    refetch,
    isLoading,
  } = useGetVaultQuery(
    { search, page_size: rowsperpage, page, exclude_by, token: accessToken },
    { skip: !accessToken },
  );
  const { data } = useDecryptedData(encryptedData, isLoading);
  const [logins, setLogins] = useState<VaultData[]>([]);
  const [isNew, setIsNew] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setLogins((prev) =>
        page === 1 ? data.results : [...(prev || []), ...data.results],
      );
      setHasMore(Boolean(data.links.next));
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (search) {
      setSearchLoading(true);
      const timer = setTimeout(() => {
        setSearchLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setSearchLoading(false);
    }
  }, [search]);

  return (
    <div className="flex flex-col relative h-full">
      <div className="flex justify-between gap-3 items-end border-b-1 pb-2">
        <div className="relative w-full pl-1">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            className="h-8 w-full peer pe-9 ps-9  "
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            {searchLoading ? (
              <LoaderCircle
                className="animate-spin"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
                role="presentation"
              />
            ) : (
              <Search size={16} strokeWidth={2} aria-hidden="true" />
            )}
          </div>
        </div>
        <div className="flex gap-3 pr-3">
          <Button
            variant="outline"
            onClick={() => setIsNew(true)}
            className="flex h-8 gap-2 p-0 px-2 data-[state=open]:bg-muted"
          >
            <Plus className="w-4 h-4" /> Add Login
          </Button>
        </div>
      </div>
      <View
        logins={logins}
        isNew={isNew}
        setIsNew={setIsNew}
        refetch={refetch}
        loading={loading}
        setLoading={setLoading}
        page={page}
        setPage={setPage}
        hasMore={hasMore}
      />
    </div>
  );
};

export default ViewAll;
