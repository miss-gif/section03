"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Searchbar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    router.push(`/search?q=${search}`);
  };

  return (
    <div className="flex gap-2">
      <Input type="text" value={search} onChange={onChangeSearch} />
      <Button onClick={onSubmit}>검색</Button>
    </div>
  );
};

export default Searchbar;
