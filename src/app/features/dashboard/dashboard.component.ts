import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { forkJoin } from 'rxjs';
import { BranchService } from '../../core/services/branch.service';
import { CategoryService } from '../../core/services/category.service';
import { ProductService } from '../../core/services/product.service';
import { SaleService } from '../../core/services/sale.service';
import { InventoryService } from '../../core/services/inventory.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

interface StatCard { titleKey: string; value: number | string; icon: string; color: string; route: string; }

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, RouterLink, MatCardModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule, TranslatePipe]
})
export class DashboardComponent implements OnInit {
  loading = true;
  stats: StatCard[] = [];
  recentSales: any[] = [];

  constructor(private branchService: BranchService, private categoryService: CategoryService, private productService: ProductService, private saleService: SaleService, private inventoryService: InventoryService) { }

  ngOnInit(): void {
    forkJoin({ branches: this.branchService.getAll(), categories: this.categoryService.getAll(), products: this.productService.getAll(), sales: this.saleService.getAll(), inventory: this.inventoryService.getAll() }).subscribe({
      next: (data) => {
        this.stats = [
          { titleKey: 'DASHBOARD.BRANCHES', value: data.branches.content.length, icon: 'store', color: '#0ea5e9', route: '/branches' },
          { titleKey: 'DASHBOARD.CATEGORIES', value: data.categories.content.length, icon: 'category', color: '#8b5cf6', route: '/categories' },
          { titleKey: 'DASHBOARD.PRODUCTS', value: data.products.content.length, icon: 'inventory', color: '#10b981', route: '/products' },
          { titleKey: 'DASHBOARD.TOTAL_SALES', value: data.sales.content.length, icon: 'point_of_sale', color: '#f59e0b', route: '/sales' },
          { titleKey: 'DASHBOARD.REVENUE', value: data.sales.content.reduce((s: number, x: any) => s + (x.totalAmount || 0), 0).toFixed(2), icon: 'attach_money', color: '#ef4444', route: '/sales' },
          { titleKey: 'DASHBOARD.INVENTORY_LINES', value: data.inventory.content.length, icon: 'warehouse', color: '#64748b', route: '/inventory' }
        ];
        this.recentSales = data.sales.content.slice(0, 10).reverse();
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }
}
