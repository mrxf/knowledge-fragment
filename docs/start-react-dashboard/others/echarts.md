# 在函数式组件中引入 Echarts

在中后台项目中，遇到最多的几种需求便是**统计图**、**增删查改表格**、**表单**，所以在这里，我们讨论一下在React中使用Echarts来做**统计图**的方案。

![](https://cdn.thisjs.com/blog_images/20201230115341.png)

比较常见的引入Echarts的方案，是采用[echarts-for-react](https://github.com/hustcc/echarts-for-react) 该组件来实现，最近Echarts 升级到版本5，echarts-for-react正在支持中，所以尝试以hooks的方案来引入Echarts。

使用Hooks封装基本的引入内容。

```tsx
import { useEffect, useRef } from "react";
import echarts from "echarts/lib/echarts";
import { EChartsFullOption } from "echarts/lib/option";
import { useDebounce, useSize } from "ahooks";

/**
 * @param chartRef Echarts挂载元素
 * @param config 配置信息
 */
function useECharts(
  chartRef: React.RefObject<HTMLDivElement>,
  config: EChartsFullOption
) {
  const chartInstance = useRef<echarts.EChartsType | null>(null);

  // 容器尺寸变化时，刷新Echarts尺寸
  const size = useSize(chartRef);
  const debouncedSize = useDebounce(size, { wait: 500 });

  useEffect(() => {
    // 配置信息更新，重新渲染Chart
    function renderChart() {
      if (!chartRef.current) {
        return;
      }
      const renderedInstance = echarts.getInstanceByDom(chartRef.current);
      if (renderedInstance) {
        chartInstance.current = renderedInstance;
      } else {
        chartInstance.current = echarts.init(chartRef.current);
      }
      chartInstance.current.setOption(config);
    }
    renderChart();
  }, [chartRef, config]);

  useEffect(() => {
    return () => {
      // unmount阶段销毁Echarts实例
      chartInstance.current?.dispose();
    };
  }, [chartInstance, debouncedSize]);

  return { chartInstance };
}

export default useECharts;

```
