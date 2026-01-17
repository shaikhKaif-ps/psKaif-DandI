'use client';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface CategoryScore {
  CategoryName: string;
  Percentage: number;
  QuadrantData?: {
    averageScore: number;
    quadrant: 'strength' | 'weakness' | 'opportunity' | 'threat';
  };
}

interface QuadrantChartProps {
  categories: CategoryScore[];
}

export default function QuadrantChart({ categories }: QuadrantChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !categories.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 700;
    const height = 500;
    const margin = { top: 50, right: 150, bottom: 60, left: 80 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Group by quadrant
    const quadrantGroups: Record<string, typeof categories> = {
      strength: categories.filter((c) => c.QuadrantData?.quadrant === 'strength'),
      opportunity: categories.filter((c) => c.QuadrantData?.quadrant === 'opportunity'),
      weakness: categories.filter((c) => c.QuadrantData?.quadrant === 'weakness'),
      threat: categories.filter((c) => c.QuadrantData?.quadrant === 'threat'),
    };

    // Map quadrants to positions
    const quadrantBounds = {
      strength: { xMin: 0, xMax: innerWidth / 2, yMin: 0, yMax: innerHeight / 2 },
      opportunity: { xMin: innerWidth / 2, xMax: innerWidth, yMin: 0, yMax: innerHeight / 2 },
      threat: { xMin: 0, xMax: innerWidth / 2, yMin: innerHeight / 2, yMax: innerHeight },
      weakness: {
        xMin: innerWidth / 2,
        xMax: innerWidth,
        yMin: innerHeight / 2,
        yMax: innerHeight,
      },
    };
    interface QuadrantPoint {
      name: string;
      x: number;
      y: number;
      quadrant: string;
      score: number;
      percentage: number;
    }

    const data: QuadrantPoint[] = [];
    Object.entries(quadrantGroups).forEach(([quadrant, cats]) => {
      const bounds = quadrantBounds[quadrant as keyof typeof quadrantBounds];
      const padding = 40;
      cats.forEach((cat, i) => {
        const cols = Math.ceil(Math.sqrt(cats.length));
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x =
          bounds.xMin +
          padding +
          (col * (bounds.xMax - bounds.xMin - 2 * padding)) / Math.max(cols - 1, 1);
        const y =
          bounds.yMin +
          padding +
          (row * (bounds.yMax - bounds.yMin - 2 * padding)) /
            Math.max(Math.ceil(cats.length / cols) - 1, 1);
        data.push({
          name: cat.CategoryName,
          x: cats.length === 1 ? (bounds.xMin + bounds.xMax) / 2 : x,
          y: cats.length === 1 ? (bounds.yMin + bounds.yMax) / 2 : y,
          quadrant,
          score: cat.QuadrantData?.averageScore || 0,
          percentage: cat.Percentage,
        });
      });
    });

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // Quadrant dividers
    g.append('line')
      .attr('x1', innerWidth / 2)
      .attr('x2', innerWidth / 2)
      .attr('y1', 0)
      .attr('y2', innerHeight)
      .attr('stroke', '#000')
      .attr('stroke-width', 2);
    g.append('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', innerHeight / 2)
      .attr('y2', innerHeight / 2)
      .attr('stroke', '#000')
      .attr('stroke-width', 2);

    // Quadrant labels
    const quadLabels = [
      { text: 'Strength (4-5)', x: innerWidth / 4, y: 20 },
      { text: 'Opportunity (3-3.9)', x: (3 * innerWidth) / 4, y: 20 },
      { text: 'Threat (1-1.9)', x: innerWidth / 4, y: innerHeight / 2 + 20 },
      { text: 'Weakness (2-2.9)', x: (3 * innerWidth) / 4, y: innerHeight / 2 + 20 },
    ];
    quadLabels.forEach((label) => {
      g.append('text')
        .attr('x', label.x)
        .attr('y', label.y)
        .attr('text-anchor', 'middle')
        .attr('font-size', '13px')
        .attr('font-weight', '600')
        .attr('fill', '#666')
        .text(label.text);
    });

    // // Title
    // svg.append('text').attr('x', width / 2).attr('y', 25).attr('text-anchor', 'middle')
    //   .attr('font-size', '18px').attr('font-weight', 'bold').text('SWOT Analysisfgsfd');

    const colorMap: Record<string, string> = {
      strength: '#22c55e',
      opportunity: '#eab308',
      weakness: '#f97316',
      threat: '#ef4444',
    };

    // Points
    g.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)
      .attr('r', 8)
      .attr('fill', (d) => colorMap[d.quadrant])
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseenter', function (event, d) {
        d3.select(this).attr('r', 11);
        tooltipName.text(d.name);
        tooltipScore.text(`Score: ${d.score.toFixed(1)}`);
        tooltipPerc.text(`Percentage: ${d.percentage.toFixed(0)}%`);
        tooltip
          .attr(
            'transform',
            `translate(${Math.min(d.x + 15, innerWidth - 190)},${Math.max(d.y - 80, 10)})`,
          )
          .style('opacity', 1);
      })
      .on('mouseleave', function () {
        d3.select(this).attr('r', 8);
        tooltip.style('opacity', 0);
      })
      .on('click', function (event, d) {
        tooltipName.text(d.name);
        tooltipScore.text(`Score: ${d.score.toFixed(1)}`);
        tooltipPerc.text(`Percentage: ${d.percentage.toFixed(0)}%`);
        tooltip
          .attr(
            'transform',
            `translate(${Math.min(d.x + 15, innerWidth - 190)},${Math.max(d.y - 80, 10)})`,
          )
          .style('opacity', 1);
      });

    // Tooltip (added after points so it appears on top)
    const tooltip = g.append('g').style('opacity', 0).attr('pointer-events', 'none');
    tooltip
      .append('rect')
      .attr('fill', '#fff')
      .attr('rx', 4)
      .attr('width', 180)
      .attr('height', 70)
      .attr('stroke', '#ccc')
      .attr('stroke-width', 1)
      .attr('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))');
    const tooltipName = tooltip
      .append('text')
      .attr('x', 10)
      .attr('y', 20)
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .attr('fill', '#000');
    const tooltipScore = tooltip
      .append('text')
      .attr('x', 10)
      .attr('y', 40)
      .attr('font-size', '11px')
      .attr('fill', '#666');
    const tooltipPerc = tooltip
      .append('text')
      .attr('x', 10)
      .attr('y', 56)
      .attr('font-size', '11px')
      .attr('fill', '#666');

    // Legend
    const legend = svg.append('g').attr('transform', `translate(${width - 140}, 60)`);
    const legendData = [
      { label: 'Strength (4-5)', color: colorMap.strength },
      { label: 'Opportunity (3-3.9)', color: colorMap.opportunity },
      { label: 'Weakness (2-2.9)', color: colorMap.weakness },
      { label: 'Threat (1-1.9)', color: colorMap.threat },
    ];
    legendData.forEach((item, i) => {
      legend
        .append('circle')
        .attr('cx', 0)
        .attr('cy', i * 22)
        .attr('r', 6)
        .attr('fill', item.color);
      legend
        .append('text')
        .attr('x', 15)
        .attr('y', i * 22 + 5)
        .attr('font-size', '11px')
        .text(item.label);
    });
  }, [categories]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 700 500"
      style={{ background: '#fff' }}
    />
  );
}
