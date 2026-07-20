from pydantic import BaseModel


class SettingsUpdate(BaseModel):
    push_notifications: bool
    weekly_email: bool
    ai_alerts: bool
    sound_effects: bool

    reduced_motion: bool
    high_contrast: bool
    auto_timezone: bool

    two_factor: bool
    recruiter_visibility: bool
    public_profile: bool

    auto_rewrite: bool
    explain_ai: bool
    share_data: bool