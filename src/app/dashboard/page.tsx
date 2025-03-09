'use client';

import React from 'react';
import { Box, Typography, Grid, Card, CardActionArea, CardContent } from '@mui/material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import SidebarLayout from './SidebarLayout';

export default function DashboardPage() {
  const userName = 'john_restrepo';

  const today = new Date();
  const formattedDate = format(today, 'EEEE, d \'de\' MMMM', {
    locale: es, // Ajustar según tu i18n actual
  });

  // Saludo según la hora
  const hour = today.getHours();
  let greeting = 'Buenos días';
  if (hour >= 12 && hour < 18) greeting = 'Buenas tardes';
  else if (hour >= 18) greeting = 'Buenas noches';

  return (
    <SidebarLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap' }}>
        {/* Encabezado lado izquierdo */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Inicio
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Aquí podrás gestionar tus programas, subprogramas y actividades.
          </Typography>
        </Box>

        {/* Encabezado lado derecho: saludo y fecha */}
        <Box sx={{ textAlign: 'right', mt: { xs: 2, md: 0 } }}>
          <Typography variant="subtitle1">
            {greeting}, <strong>{userName}</strong>
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {formattedDate}
          </Typography>
        </Box>
      </Box>

      {/* Sección de tarjetas */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="Crear Programa" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="Crear Subprograma" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="Crear Actividad" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="Ver Reportes" />
        </Grid>
      </Grid>
    </SidebarLayout>
  );
}

// Tarjeta reutilizable
function DashboardCard({ title }: { title: string }) {
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 2, // leve sombra
        textAlign: 'center',
        bgcolor: '#fff',
      }}
    >
      <CardActionArea sx={{ minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
