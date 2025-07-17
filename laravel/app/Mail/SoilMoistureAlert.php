<?php

namespace App\Mail;

use App\Models\SoilMoisture;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SoilMoistureAlert extends Mailable
{
    use Queueable, SerializesModels;

    public $soilMoisture;

    public function __construct(SoilMoisture $soilMoisture)
    {
        $this->soilMoisture = $soilMoisture;
    }

    public function build()
    {
        return $this
            ->subject('【アラート】土壌水分量がしきい値を下回りました')
            ->markdown('emails.soil_moisture_alert');
    }
}
