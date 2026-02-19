'use client';
import { useEffect, useRef, useState } from 'react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature, mesh } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import { cities } from '@/data/cities';
import { useInView } from '@/hooks/useInView';

const W = 960, H = 500;
const TOPOJSON_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

export default function WorldMap() {
  const { ref: wrapRef, isVisible } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const svgRef = useRef<SVGSVGElement>(null);
  const [paths, setPaths] = useState<{ land: string[]; borders: string }>({ land: [], borders: '' });
  const [loaded, setLoaded] = useState(false);

  const proj = geoNaturalEarth1().scale(155).translate([W / 2, H / 2 + 20]);
  const pathGen = geoPath(proj);

  useEffect(() => {
    fetch(TOPOJSON_URL)
      .then(r => r.json())
      .then((world: Topology) => {
        const countries = world.objects.countries as GeometryCollection;
        const land = feature(world, countries);
        const borders = mesh(world, countries, (a, b) => a !== b);

        const landPaths = (land as any).features.map((f: any) => pathGen(f) || '');
        const borderPath = pathGen(borders) || '';

        setPaths({ land: landPaths, borders: borderPath });
        setLoaded(true);
      })
      .catch(() => setLoaded(false));
  }, []);

  const hub = proj([cities[0].lng, cities[0].lat])!;
  const active = isVisible && loaded;

  return (
    <div ref={wrapRef}>
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        {/* Land */}
        <g>
          {paths.land.map((d, i) => (
            <path key={i} d={d} fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.06)" strokeWidth=".3" />
          ))}
          {paths.borders && (
            <path d={paths.borders} fill="none" stroke="rgba(255,255,255,.04)" strokeWidth=".2" />
          )}
        </g>

        {/* Routes */}
        <g>
          {cities.slice(1).map((c, i) => {
            const pt = proj([c.lng, c.lat])!;
            const mx = (hub[0] + pt[0]) / 2;
            const my = (hub[1] + pt[1]) / 2 - 25;
            return (
              <path
                key={c.name}
                d={`M${hub[0]},${hub[1]} Q${mx},${my} ${pt[0]},${pt[1]}`}
                fill="none" stroke="rgba(255,255,255,.1)" strokeWidth=".8"
                strokeDasharray="4,4"
                opacity={active ? 1 : 0}
                style={{ transition: `opacity 1s var(--ease) ${0.4 + i * 0.1}s` }}
              />
            );
          })}
        </g>

        {/* Cities */}
        <g>
          {cities.map((c, i) => {
            const [x, y] = proj([c.lng, c.lat])!;
            const isHub = !!c.hub;
            const delay = `${0.3 + i * 0.12}s`;
            return (
              <g key={c.name}>
                <circle cx={x} cy={y} r={isHub ? 8 : 5}
                  fill="none" stroke={`rgba(255,255,255,${isHub ? '.4' : '.25'})`}
                  strokeWidth={isHub ? '.8' : '.6'}
                  opacity={active ? 1 : 0}
                  style={{ transition: `opacity .6s var(--ease) ${delay}`, animation: active ? `ringP ${isHub ? 2.5 : 3}s ease-in-out infinite ${i * 0.3}s` : 'none' }}
                />
                <circle cx={x} cy={y} r={isHub ? 4 : 2.2}
                  fill="#fff"
                  opacity={active ? (isHub ? 1 : 0.8) : 0}
                  style={{ transition: `opacity .6s var(--ease) ${delay}` }}
                />
                <text x={x} y={y - (isHub ? 16 : 12)}
                  textAnchor="middle"
                  fill={`rgba(255,255,255,${isHub ? '.55' : '.35'})`}
                  fontSize={isHub ? 8 : 7}
                  fontWeight={isHub ? 500 : 400}
                  fontFamily="'DM Sans', sans-serif"
                  letterSpacing={isHub ? '1.5px' : '1px'}
                  opacity={active ? 1 : 0}
                  style={{ transition: `opacity .6s var(--ease) ${0.5 + i * 0.1}s` }}
                >
                  {c.name}
                </text>
              </g>
            );
          })}
        </g>

        <style>{`@keyframes ringP{0%,100%{r:5;opacity:.4}50%{r:14;opacity:0}}`}</style>
      </svg>
    </div>
  );
}
