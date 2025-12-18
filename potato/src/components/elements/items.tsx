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

const WorksList: React.FC = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ⭐ 新增

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<Work[]>("/api/baidu/2025works");
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

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        2025作品列表
      </Typography>

      <List>
        {works.map((work, index) => (
          <ListItem
            key={index + 1}
            divider
            button
            onClick={() => navigate(`/${index + 1}`)} // ⭐ 跳转
            sx={{ cursor: "pointer" }}
          >
            <ListItemText primary={work.server_filename} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default WorksList;
