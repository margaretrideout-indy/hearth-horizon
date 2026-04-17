<Routes>
  {/* --- ADMIN --- */}
  <Route path="/admin" element={
    <AdminRoute>
      <AdminDashboard vault={vault} onSync={onSync} />
    </AdminRoute>
  } />
  
  {/* --- PUBLIC ACCESS (GROVE, HORIZON, & LIBRARY) --- */}
  {/* These are open to everyone to maximize affiliate reach and brand awareness */}
  <Route path="/" element={<GroveTiers vault={vault} onSync={onSync} isAdmin={isAdmin} />} />
  <Route path="/grove" element={<GroveTiers vault={vault} onSync={onSync} isAdmin={isAdmin} />} />
  
  <Route path="/horizon" element={
    <AppLayout currentTier={effectiveTier}>
      <Canopy vault={vault} onSync={onSync} isAdmin={isAdmin} userTier={effectiveTier} />
    </AppLayout>
  } />

  <Route path="/library" element={
    <AppLayout currentTier={effectiveTier}>
      <Library vault={vault} onSync={onSync} isAdmin={isAdmin} />
    </AppLayout>
  } />
  
  {/* Redirects */}
  <Route path="/launch" element={<Navigate to="/horizon" replace />} />
  <Route path="/canopy" element={<Navigate to="/horizon" replace />} />

  {/* --- PROTECTED ACCESS (SUBSCRIBERS ONLY) --- */}
  {/* These remain the core "Product" features */}
  
  <Route path="/hearth" element={
    <ProtectedRoute>
      <AppLayout currentTier={effectiveTier}>
        <YourHearth 
          vault={vault} 
          onSync={onSync} 
          onResumeSync={onResumeSync}
          isAdmin={isAdmin}
          onNavigateToLibrary={() => navigate('/library')}
          onNavigateToEmbers={() => navigate('/embers')}
          onNavigateToHorizon={() => navigate('/horizon')}
        />
      </AppLayout>
    </ProtectedRoute>
  } />

  <Route path="/alignment" element={
    <ProtectedRoute>
      <AppLayout currentTier={effectiveTier}>
        <CulturalFit vault={vault} onSync={onSync} isAdmin={isAdmin} />
      </AppLayout>
    </ProtectedRoute>
  } />

  <Route path="/embers" element={
    <ProtectedRoute>
      <AppLayout currentTier={effectiveTier}>
        <EmbersChat isAdmin={isAdmin} />
      </AppLayout>
    </ProtectedRoute>
  } />
  
  <Route path="/contact" element={
    <ProtectedRoute>
      <AppLayout currentTier={effectiveTier}>
        <Contact />
      </AppLayout>
    </ProtectedRoute>
  } />

  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>