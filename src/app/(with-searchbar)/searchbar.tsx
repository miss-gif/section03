"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const Searchbar = () => {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex gap-2">
      <Input type="text" value={search} onChange={onChangeSearch} />
      <Button>버튼</Button>
    </div>
  );
};

export default Searchbar;
