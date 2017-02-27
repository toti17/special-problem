<?php

use Illuminate\Database\Seeder;

class StudentNumberTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i=0;$i<50;$i++){
            DB::table('student_number')->insert([
                'student_number' => 2013 . mt_rand(10000, 99999)
            ]);
        }
    }
}