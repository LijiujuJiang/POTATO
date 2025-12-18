import React, { useEffect, useState } from "react";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Typography
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 只保留我们需要的字段
interface Work {
  fs_id: number;
  server_filename: string;
}

const ItemOne: React.FC = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ⭐ 新增

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<Work[]>("/api/baidu/2025works/big");
        console.log("接口返回数据:", res.data);
        setWorks(res.data);
      } catch (err) {
        console.error("Failed to fetch works:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


    return (
        <div></div>
    )
}

export default ItemOne;