# Generated by Django 4.2.1 on 2023-05-08 20:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("home", "0006_experience_present_alter_experience_end_date"),
    ]

    operations = [
        migrations.CreateModel(
            name="Responsibility",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("description", models.TextField()),
            ],
        ),
        migrations.RemoveField(
            model_name="experience",
            name="experience_description",
        ),
        migrations.AddField(
            model_name="experience",
            name="description",
            field=models.ManyToManyField(to="home.responsibility"),
        ),
    ]
