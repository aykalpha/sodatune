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
            ->subject('【そだちゅーん】土壌水分量が閾値を下回りました。')
            ->text('emails.soil_moisture_alert');
    }
}
