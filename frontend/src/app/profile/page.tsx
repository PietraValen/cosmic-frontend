"use client";

import { useRequireAuth } from "@/contexts/AuthContext";
import { useApi, useMutation } from "@/hooks/useApi";
import { api, UserProfile, UpdateProfileData, ChangePasswordData } from "@/services/api";
import { LoadingSpinner, CardSkeleton } from "@/components/LoadingComponents";
import { ErrorComponent } from "@/components/ErrorComponents";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Shield,
  Bell,
  Lock,
  Eye,
  EyeOff,
  Save,
  Edit,
  ArrowLeft,
  Camera,
  Calendar,
  MapPin,
  Phone,
  Globe,
  Github,
  Linkedin,
  Twitter,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  analysisAlerts: boolean;
  weeklyReports: boolean;
  securityAlerts: boolean;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  passwordLastChanged: string;
  loginAlerts: boolean;
}

export default function ProfilePage() {
  const { user, isLoading } = useRequireAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // API calls
  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
    refetch: refetchProfile
  } = useApi(() => api.getUserProfile());

  // Mutations
  const {
    mutate: updateProfile,
    loading: updateLoading,
    error: updateError
  } = useMutation((data: UpdateProfileData) => api.updateUserProfile(data));

  const {
    mutate: changePassword,
    loading: passwordLoading,
    error: passwordError
  } = useMutation((data: ChangePasswordData) => api.changePassword(data));

  const {
    mutate: uploadAvatar,
    loading: avatarLoading
  } = useMutation((file: File) => api.uploadAvatar(file));

  // Estados locais
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "notifications">("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  // Form states
  const [profileForm, setProfileForm] = useState<UpdateProfileData>({
    name: profileData?.name || "",
    bio: "",
    location: "",
    phone: "",
    website: "",
    github: "",
    linkedin: "",
    twitter: "",
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    analysisAlerts: true,
    weeklyReports: false,
    securityAlerts: true,
  });

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    passwordLastChanged: "2024-01-15",
    loginAlerts: true,
  });

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  // Update form when profile data loads
  useEffect(() => {
    if (profileData && !isEditing) {
      setProfileForm({
        name: profileData.name || "",
        bio: (profileData as UserProfile).bio || "",
        location: (profileData as UserProfile).location || "",
        phone: (profileData as UserProfile).phone || "",
        website: (profileData as UserProfile).website || "",
        github: (profileData as UserProfile).github || "",
        linkedin: (profileData as UserProfile).linkedin || "",
        twitter: (profileData as UserProfile).twitter || "",
      });
    }
  }, [profileData, isEditing]);

  // Loading state
  if (isLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <LoadingSpinner size="lg" message="Carregando perfil..." />
          </div>
          <CardSkeleton count={3} />
        </div>
      </div>
    );
  }

  // Error state
  if (profileError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorComponent
            error={profileError}
            onRetry={refetchProfile}
            type="general"
          />
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // useRequireAuth will redirect
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateSuccess(null);
    
    const result = await updateProfile(profileForm);
    if (result?.success) {
      setUpdateSuccess("Perfil atualizado com sucesso!");
      setIsEditing(false);
      refetchProfile();
      setTimeout(() => setUpdateSuccess(null), 3000);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSuccess(null);
    
    if (passwordForm.password !== passwordForm.password_confirmation) {
      return;
    }

    const result = await changePassword(passwordForm);
    if (result?.success) {
      setPasswordSuccess("Senha alterada com sucesso!");
      setPasswordForm({
        current_password: "",
        password: "",
        password_confirmation: "",
      });
      setTimeout(() => setPasswordSuccess(null), 3000);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const result = await uploadAvatar(file);
      if (result?.success) {
        refetchProfile();
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <User className="w-7 h-7 text-blue-400" />
                Perfil do Usuário
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-8 mb-8">
          <button
            onClick={() => setActiveTab("profile")}
            className={`pb-2 border-b-2 font-medium transition-colors ${
              activeTab === "profile"
                ? "border-blue-400 text-blue-400"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <User className="w-5 h-5 inline mr-2" />
            Perfil
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`pb-2 border-b-2 font-medium transition-colors ${
              activeTab === "security"
                ? "border-blue-400 text-blue-400"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <Shield className="w-5 h-5 inline mr-2" />
            Segurança
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`pb-2 border-b-2 font-medium transition-colors ${
              activeTab === "notifications"
                ? "border-blue-400 text-blue-400"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <Bell className="w-5 h-5 inline mr-2" />
            Notificações
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="space-y-8">
            {/* Basic Info */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold text-white">Informações Básicas</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  {isEditing ? "Cancelar" : "Editar"}
                </button>
              </div>

              {/* Success Message */}
              {updateSuccess && (
                <div className="mb-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  {updateSuccess}
                </div>
              )}

              {/* Error Message */}
              {updateError && (
                <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-400">
                  <AlertCircle className="w-5 h-5" />
                  {updateError}
                </div>
              )}

              <form onSubmit={handleProfileUpdate}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Avatar */}
                  <div className="md:col-span-2 flex items-center space-x-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      {isEditing && (
                        <button
                          type="button"
                          onClick={triggerFileInput}
                          disabled={avatarLoading}
                          className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors disabled:opacity-50"
                        >
                          {avatarLoading ? (
                            <LoadingSpinner size="sm" />
                          ) : (
                            <Camera className="w-4 h-4" />
                          )}
                        </button>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                      <p className="text-gray-400">{user.role}</p>
                      <p className="text-gray-400">{user.email}</p>
                    </div>
                  </div>

                  {/* Nome */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none disabled:opacity-50"
                    />
                  </div>

                  {/* Bio */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Biografia
                    </label>
                    <textarea
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
                      disabled={!isEditing}
                      rows={3}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none disabled:opacity-50"
                      placeholder="Conte um pouco sobre você..."
                    />
                  </div>

                  {/* Localização */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Localização
                    </label>
                    <input
                      type="text"
                      value={profileForm.location}
                      onChange={(e) => setProfileForm({...profileForm, location: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none disabled:opacity-50"
                      placeholder="Cidade, País"
                    />
                  </div>

                  {/* Telefone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Telefone
                    </label>
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none disabled:opacity-50"
                      placeholder="+55 11 99999-9999"
                    />
                  </div>

                  {/* Website */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Globe className="w-4 h-4 inline mr-1" />
                      Website
                    </label>
                    <input
                      type="url"
                      value={profileForm.website}
                      onChange={(e) => setProfileForm({...profileForm, website: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none disabled:opacity-50"
                      placeholder="https://seu-site.com"
                    />
                  </div>

                  {/* GitHub */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Github className="w-4 h-4 inline mr-1" />
                      GitHub
                    </label>
                    <input
                      type="text"
                      value={profileForm.github}
                      onChange={(e) => setProfileForm({...profileForm, github: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none disabled:opacity-50"
                      placeholder="seu-usuario"
                    />
                  </div>

                  {/* LinkedIn */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Linkedin className="w-4 h-4 inline mr-1" />
                      LinkedIn
                    </label>
                    <input
                      type="text"
                      value={profileForm.linkedin}
                      onChange={(e) => setProfileForm({...profileForm, linkedin: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none disabled:opacity-50"
                      placeholder="seu-perfil"
                    />
                  </div>

                  {/* Twitter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Twitter className="w-4 h-4 inline mr-1" />
                      Twitter
                    </label>
                    <input
                      type="text"
                      value={profileForm.twitter}
                      onChange={(e) => setProfileForm({...profileForm, twitter: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none disabled:opacity-50"
                      placeholder="@seu_usuario"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      disabled={updateLoading}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                    >
                      {updateLoading ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      Salvar Alterações
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Account Info */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Informações da Conta</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-gray-300">Membro desde</p>
                    <p className="text-white">15 de Janeiro, 2024</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-gray-300">Último acesso</p>
                    <p className="text-white">Hoje às 14:30</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="space-y-8">
            {/* Change Password */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Alterar Senha</h2>

              {/* Success Message */}
              {passwordSuccess && (
                <div className="mb-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  {passwordSuccess}
                </div>
              )}

              {/* Error Message */}
              {passwordError && (
                <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-400">
                  <AlertCircle className="w-5 h-5" />
                  {passwordError}
                </div>
              )}

              <form onSubmit={handlePasswordChange} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Senha Atual
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordForm.current_password}
                      onChange={(e) => setPasswordForm({...passwordForm, current_password: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nova Senha
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={passwordForm.password}
                      onChange={(e) => setPasswordForm({...passwordForm, password: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirmar Nova Senha
                  </label>
                  <input
                    type="password"
                    value={passwordForm.password_confirmation}
                    onChange={(e) => setPasswordForm({...passwordForm, password_confirmation: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    required
                  />
                  {passwordForm.password && passwordForm.password_confirmation && 
                   passwordForm.password !== passwordForm.password_confirmation && (
                    <p className="text-red-400 text-sm mt-1">As senhas não coincidem</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={passwordLoading || passwordForm.password !== passwordForm.password_confirmation}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  {passwordLoading ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                  Alterar Senha
                </button>
              </form>
            </div>

            {/* Security Settings */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Configurações de Segurança</h2>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-white font-medium">Autenticação de Dois Fatores</h3>
                    <p className="text-gray-400 text-sm">
                      Adicione uma camada extra de segurança à sua conta
                    </p>
                  </div>
                  <button
                    onClick={() => setSecurity({...security, twoFactorEnabled: !security.twoFactorEnabled})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      security.twoFactorEnabled ? "bg-blue-600" : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        security.twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-white font-medium">Alertas de Login</h3>
                    <p className="text-gray-400 text-sm">
                      Receba notificações sobre novos logins
                    </p>
                  </div>
                  <button
                    onClick={() => setSecurity({...security, loginAlerts: !security.loginAlerts})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      security.loginAlerts ? "bg-blue-600" : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        security.loginAlerts ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center space-x-3 pt-4">
                  <Lock className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-gray-300">Senha alterada pela última vez</p>
                    <p className="text-white">15 de Janeiro, 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Preferências de Notificação</h2>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-medium">Notificações por Email</h3>
                  <p className="text-gray-400 text-sm">
                    Receba atualizações importantes por email
                  </p>
                </div>
                <button
                  onClick={() => setNotifications({...notifications, emailNotifications: !notifications.emailNotifications})}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.emailNotifications ? "bg-blue-600" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.emailNotifications ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-medium">Notificações Push</h3>
                  <p className="text-gray-400 text-sm">
                    Receba notificações em tempo real no browser
                  </p>
                </div>
                <button
                  onClick={() => setNotifications({...notifications, pushNotifications: !notifications.pushNotifications})}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.pushNotifications ? "bg-blue-600" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.pushNotifications ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-medium">Alertas de Análise</h3>
                  <p className="text-gray-400 text-sm">
                    Notificações sobre conclusão de análises
                  </p>
                </div>
                <button
                  onClick={() => setNotifications({...notifications, analysisAlerts: !notifications.analysisAlerts})}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.analysisAlerts ? "bg-blue-600" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.analysisAlerts ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-medium">Relatórios Semanais</h3>
                  <p className="text-gray-400 text-sm">
                    Resumo semanal das suas atividades
                  </p>
                </div>
                <button
                  onClick={() => setNotifications({...notifications, weeklyReports: !notifications.weeklyReports})}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.weeklyReports ? "bg-blue-600" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.weeklyReports ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-medium">Alertas de Segurança</h3>
                  <p className="text-gray-400 text-sm">
                    Notificações sobre atividades suspeitas
                  </p>
                </div>
                <button
                  onClick={() => setNotifications({...notifications, securityAlerts: !notifications.securityAlerts})}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.securityAlerts ? "bg-blue-600" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.securityAlerts ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <Save className="w-4 h-4" />
                Salvar Preferências
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}