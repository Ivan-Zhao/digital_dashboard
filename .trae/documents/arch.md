
## 1. Architecture Design
```mermaid
graph TB
    subgraph "Frontend"
        A["React Application"]
        B["ECharts 地图组件"]
        C["数据可视化组件"]
    end
    subgraph "Assets"
        D["中国地图 GeoJSON"]
        E["静态资源"]
    end
    A --&gt; B
    A --&gt; C
    B --&gt; D
    A --&gt; E
```

## 2. Technology Description
- Frontend: React@18 + TypeScript + Tailwind CSS@3 + Vite
- 初始化工具: vite-init
- 地图库: ECharts@5
- 图标库: lucide-react
- 后端: 无（纯前端应用）
- 数据库: 无

## 3. Route Definitions
| Route | Purpose |
|-------|---------|
| / | 数字大屏首页 |

## 4. API Definitions (无后端)

## 5. Server Architecture Diagram (无后端)

## 6. Data Model (无数据库)

### 6.1 组件结构
- `src/pages/Dashboard.tsx` - 主大屏页面
- `src/components/MapChart.tsx` - 中国地图组件
- `src/components/DataCard.tsx` - 数据卡片组件
- `src/components/TrendChart.tsx` - 趋势图表组件
- `src/assets/china.json` - 中国地图GeoJSON数据
